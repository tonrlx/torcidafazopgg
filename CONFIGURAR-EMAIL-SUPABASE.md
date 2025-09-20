# 📧 Configurar Email Personalizado no Supabase

## **Passos para personalizar o email de confirmação:**

### **1. Acesse o Supabase Dashboard**
- Vá para: https://supabase.com/dashboard/project/grgovhcblqmwsbnmjlmi
- Clique em **"Authentication"** no menu lateral
- Clique em **"Email Templates"**

### **2. Configure o Template de Confirmação**

**Título do Email:**
```
Bem-vindo à Torcida Faz o P! Confirme sua conta
```

**Conteúdo do Email (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Confirmação de Conta - Torcida Faz o P</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #000; color: #fff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #111; border: 2px solid #ff0000; border-radius: 10px; padding: 30px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { color: #ff0000; font-size: 24px; font-weight: bold; }
        .button { background-color: #ff0000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .footer { margin-top: 30px; text-align: center; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🔥 TORCIDA FAZ O P</div>
            <h1>Bem-vindo à nossa comunidade!</h1>
        </div>
        
        <p>Olá!</p>
        
        <p>Obrigado por se cadastrar na <strong>Torcida Faz o P</strong> - o portal oficial da torcida da paiN Gaming!</p>
        
        <p>Para ativar sua conta e começar a participar das discussões, clique no botão abaixo:</p>
        
        <div style="text-align: center;">
            <a href="{{ .ConfirmationURL }}" class="button">CONFIRMAR MINHA CONTA</a>
        </div>
        
        <p>Após confirmar, você poderá:</p>
        <ul>
            <li>✅ Comentar nas notícias</li>
            <li>✅ Curtir e responder comentários</li>
            <li>✅ Participar das discussões da comunidade</li>
            <li>✅ Acompanhar tudo sobre a paiN Gaming</li>
        </ul>
        
        <p>Se você não criou esta conta, pode ignorar este email.</p>
        
        <div class="footer">
            <p>🔥 Torcida Faz o P - Portal Oficial da Torcida paiN Gaming</p>
            <p>Este email foi enviado automaticamente, não responda.</p>
        </div>
    </div>
</body>
</html>
```

### **3. Configurações Adicionais**

**Subject (Assunto):**
```
🔥 Confirme sua conta na Torcida Faz o P
```

**Redirect URL (após confirmação):**
```
https://torcidafazop.com.br
```

### **4. Salvar as Configurações**
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
