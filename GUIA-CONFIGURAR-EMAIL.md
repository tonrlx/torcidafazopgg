# 🔥 GUIA PARA CONFIGURAR EMAIL NO SUPABASE

## ⚠️ IMPORTANTE: NÃO EXECUTE CÓDIGO MARKDOWN NO SQL EDITOR!

O SQL Editor do Supabase só aceita comandos SQL, não Markdown (```).

## 📋 PASSOS PARA CONFIGURAR:

### 1. **Acesse o Painel do Supabase**
- Vá para [supabase.com](https://supabase.com)
- Faça login na sua conta
- Selecione seu projeto

### 2. **Configure o Template de Email**
- Vá para **"Authentication"** > **"Email Templates"**
- Clique em **"Confirm signup"**
- Cole o HTML abaixo no campo **"Body"**:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Torcida Faz o P</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background-color: #f5f5f5; 
            color: #333; 
            margin: 0; 
            padding: 40px 20px; 
            text-align: center;
        }
        .container { 
            max-width: 500px; 
            margin: 0 auto; 
            background-color: #fff; 
            border-radius: 12px; 
            padding: 50px 30px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .logo { 
            color: #ff0000; 
            font-size: 32px; 
            font-weight: bold; 
            margin-bottom: 40px;
            letter-spacing: 1px;
        }
        .message {
            font-size: 18px;
            color: #333;
            margin-bottom: 40px;
            line-height: 1.5;
        }
        .button { 
            background-color: #ff0000; 
            color: white; 
            padding: 16px 32px; 
            text-decoration: none; 
            border-radius: 8px; 
            display: inline-block; 
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #cc0000;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">Torcida Faz o P</div>
        
        <div class="message">
            Ficamos muito felizes em ter você na <strong>MELHOR TORCIDA DO MUNDO</strong>
        </div>
        
        <a href="{{ .ConfirmationURL }}" class="button">Confirmar Email</a>
    </div>
</body>
</html>
```

### 3. **Configure o Assunto**
- No campo **"Subject"**, coloque: `Torcida Faz o P - Confirmação de Email`

### 4. **Configure as URLs**
- Vá para **"Authentication"** > **"URL Configuration"**
- Em **"Site URL"**, coloque: `https://torcidafazop.com.br`
- Em **"Redirect URLs"**, adicione: `https://torcidafazop.com.br/**`

### 5. **Salve as Configurações**
- Clique em **"Save"** em todas as páginas
- Teste enviando um email de teste

## ✅ VERIFICAÇÃO FINAL:

Execute o arquivo `configurar-email-supabase.sql` no SQL Editor para verificar se tudo está funcionando.

## 🚨 LEMBRE-SE:

- **SQL Editor** = Apenas comandos SQL
- **Markdown** = Apenas para documentação
- **HTML** = Apenas no template de email
