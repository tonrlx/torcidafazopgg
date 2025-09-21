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
    <title>CONFIRMAÇÃO TORCIDAFAZOP</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background-color: #000; 
            color: #fff; 
            margin: 0; 
            padding: 20px; 
            text-align: center;
        }
        .container { 
            max-width: 400px; 
            margin: 0 auto; 
            background-color: #111; 
            border: 2px solid #ff0000; 
            border-radius: 10px; 
            padding: 40px 20px; 
        }
        .logo { 
            color: #ff0000; 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 30px;
        }
        .button { 
            background-color: #ff0000; 
            color: white; 
            padding: 20px 40px; 
            text-decoration: none; 
            border-radius: 8px; 
            display: inline-block; 
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .button:hover {
            background-color: #cc0000;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🔥 TORCIDA FAZ O P</div>
        
        <div style="text-align: center;">
            <a href="{{ .ConfirmationURL }}" class="button">CONFIRMAR E-MAIL</a>
        </div>
    </div>
</body>
</html>
```

### 3. **Configure o Assunto**
- No campo **"Subject"**, coloque: `CONFIRMAÇÃO TORCIDAFAZOP`

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
