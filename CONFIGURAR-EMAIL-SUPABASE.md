# 📧 Configurar Email Personalizado no Supabase

## **Passos para personalizar o email de confirmação:**

### **1. Acesse o Supabase Dashboard**
- Vá para: https://supabase.com/dashboard/project/grgovhcblqmwsbnmjlmi
- Clique em **"Authentication"** no menu lateral
- Clique em **"Email Templates"**

### **2. Configure o Template de Confirmação**

**Título do Email:**
```
CONFIRMAÇÃO TORCIDAFAZOP
```

**Conteúdo do Email (HTML):**
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

### **3. Configurações Adicionais**

**Subject (Assunto):**
```
CONFIRMAÇÃO TORCIDAFAZOP
```

**Redirect URL (após confirmação):**
```
https://torcidafazop.com.br/auth/callback
```

**Site URL (produção e desenvolvimento):**
```
https://torcidafazop.com.br
```

### **4. Configurar Site URL**
- Vá para **"Authentication"** > **"URL Configuration"**
- Em **"Site URL"**, coloque: `https://torcidafazop.com.br`
- Em **"Redirect URLs"**, adicione: `https://torcidafazop.com.br/**`
- Clique em **"Save"**

### **5. Salvar as Configurações**
- Clique em **"Save"** para salvar o template
- Teste enviando um email de teste

## **Resultado:**
- ✅ Email com visual da Torcida Faz o P
- ✅ Cores preto e vermelho
- ✅ Informações sobre o portal
- ✅ Botão de confirmação estilizado
- ✅ Lista de benefícios da conta

## **Teste:**
1. Crie uma nova conta no site
2. Verifique se o email chegou com o novo visual
3. Confirme se o link de confirmação funciona
