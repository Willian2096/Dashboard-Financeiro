-- Adicionar coluna source na tabela transactions (se não existir)
ALTER TABLE public.transactions
ADD COLUMN IF NOT EXISTS source text DEFAULT 'manual';

-- Adicionar coluna card_id se não existir
ALTER TABLE public.transactions
ADD COLUMN IF NOT EXISTS card_id uuid;

-- Função de categorização por nome do estabelecimento
CREATE OR REPLACE FUNCTION public.categorize_merchant(merchant text)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  m text := lower(unaccent(merchant));
BEGIN
  -- Alimentação
  IF m ~* '(restaurante|lanchonete|padaria|pizzaria|sushi|burger|mcdonald|kfc|subway|ifood|rappi|uber.?eat|bakery|cafe|café|cafeteria|bistro|churrascaria|pasteis|pastelaria|tapioca|acai|açaí|sorvete|gelateria|madalena|confeitaria|doceria|hortifruti|mercado|supermercado|pao.?de.?acucar|carrefour|extra|atacadao|assai|natural|organico|feira|quitanda|mercearia|bar |bares|boteco|pub |cervejaria|salgados|loja.?natural|comida|food|snack|lunch|dinner|breakfast|brunch)' THEN
    RETURN 'Alimentação';
  END IF;

  -- Transporte
  IF m ~* '(uber|99|taxi|cabify|ônibus|metro|metrô|trem|brt|terminal|combustivel|combustível|posto|shell|petrobras|ipiranga|br.?distribuidora|estacionamento|parking|pedagio|pedágio|autoestrada|rodovia|detran|despachante|autoescola|carro|veiculo|veículo|moto|bike|patinete|scooter|onibus|ônibus)' THEN
    RETURN 'Transporte';
  END IF;

  -- Saúde
  IF m ~* '(farmacia|farmácia|droga|drogasil|drogaria|ultrafarma|panvel|pague.?menos|ultrafarma|clinica|clínica|hospital|medico|médico|dentista|odonto|laboratorio|laboratório|exame|consulta|plano.?saude|unimed|bradesco.?saude|sulamerica|amil|hapvida|notredame|academia|gym|fitness|nutri|nutricao|nutrição|fisio|psico|terapia|veterinario|pet)' THEN
    RETURN 'Saúde';
  END IF;

  -- Moradia
  IF m ~* '(aluguel|condominio|condomínio|iptu|energia|light|cpfl|enel|eletropaulo|gas|agua|sabesp|copasa|sanepar|internet|claro|vivo|tim|oi |nextel|telefone|tevê|tv.?cabo|sky |net |gvt|reforma|construção|construcao|material.?construção|leroy|telhanorte|casa.?bahia|magazine|movei|imóvel|imovel)' THEN
    RETURN 'Moradia';
  END IF;

  -- Lazer
  IF m ~* '(cinema|cine|teatro|show|ingresso|ticketmaster|sympla|eventim|netflix|spotify|amazon.?prime|disney|hbo|globo.?play|crunchyroll|youtube|twitch|steam|playstation|xbox|nintendo|jogo|game|parque|museu|exposição|exposicao|bowling|karting|laser.?tag|escape.?room|shopping|mall)' THEN
    RETURN 'Lazer';
  END IF;

  -- Educação
  IF m ~* '(escola|faculdade|universidade|curso|aula|mensalidade|matricula|matrícula|livraria|saraiva|cultura|amazon|kindle|udemy|coursera|alura|dio |rocketseat|descomplica|prevestibular|colegio|colégio|ensino|educação|educacao|apostila|material.?escolar)' THEN
    RETURN 'Educação';
  END IF;

  -- Vestuário
  IF m ~* '(roupa|vestuario|vestuário|moda|zara|hm|h&m|renner|riachuelo|c&a|marisa|farm|animale|arezzo|schutz|sapato|calçado|calcado|tenis|tênis|camisa|calça|calca|vestido|acessorio|acessório|bolsa|mala|joias|jóias|relogio|relógio)' THEN
    RETURN 'Vestuário';
  END IF;

  -- Padrão
  RETURN 'Outros';
END;
$$;

-- Função principal chamada pela automação do iPhone
CREATE OR REPLACE FUNCTION public.import_apple_pay(
  p_data text,
  p_comerciante text,
  p_valor numeric,
  p_banco text DEFAULT NULL,
  p_tipo text DEFAULT 'credito'
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_type text;
  v_date date;
  v_new_id uuid;
  v_clean_name text;
  v_category text;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN json_build_object('error', 'not authenticated');
  END IF;

  -- Limpar nome: remove números soltos, códigos, asteriscos, múltiplos espaços
  v_clean_name := regexp_replace(p_comerciante, '\s*\*\s*', ' ', 'g');
  v_clean_name := regexp_replace(v_clean_name, '\s{2,}', ' ', 'g');
  v_clean_name := regexp_replace(v_clean_name, '^\s+|\s+$', '', 'g');
  -- Remove sequências de números com mais de 4 dígitos (códigos)
  v_clean_name := regexp_replace(v_clean_name, '\b\d{5,}\b', '', 'g');
  v_clean_name := regexp_replace(v_clean_name, '\s{2,}', ' ', 'g');
  v_clean_name := btrim(v_clean_name);

  -- Tipo da transação
  v_type := CASE WHEN lower(p_tipo) IN ('credito', 'crédito', 'credit', 'expense') THEN 'expense' ELSE 'income' END;

  -- Data
  BEGIN
    v_date := to_date(p_data, 'DD/MM/YYYY');
  EXCEPTION WHEN OTHERS THEN
    BEGIN
      v_date := p_data::date;
    EXCEPTION WHEN OTHERS THEN
      v_date := current_date;
    END;
  END;

  -- Categorização automática
  v_category := public.categorize_merchant(v_clean_name);

  -- Inserir transação
  INSERT INTO public.transactions (user_id, description, amount, type, category, date, source)
  VALUES (v_user_id, v_clean_name, ABS(p_valor), v_type, v_category, v_date, 'apple_pay')
  RETURNING id INTO v_new_id;

  RETURN json_build_object(
    'success', true,
    'id', v_new_id,
    'description', v_clean_name,
    'category', v_category,
    'amount', ABS(p_valor),
    'date', v_date
  );
END;
$$;

-- Garantir permissão de execução para usuários autenticados
GRANT EXECUTE ON FUNCTION public.import_apple_pay TO authenticated;
GRANT EXECUTE ON FUNCTION public.categorize_merchant TO authenticated;
