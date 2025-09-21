# 📧 Configurar Email Personalizado no Supabase

## **Passos para personalizar o email de confirmação:**

### **1. Acesse o Supabase Dashboard**
- Vá para: https://supabase.com/dashboard/project/grgovhcblqmwsbnmjlmi
- Clique em **"Authentication"** no menu lateral
- Clique em **"Email Templates"**

### **2. Configure o Template de Confirmação**

**Título do Email:**
```
Torcida Faz o P
```

**Conteúdo do Email (HTML):**
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
        
        <a href="{{ .ConfirmationURL }}" class="button">Confirmar Email</a>
    </div>
</body>
</html>
```

### **3. Configurações Adicionais**

**Subject (Assunto):**
```
Torcida Faz o P - Confirmação de Email
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
