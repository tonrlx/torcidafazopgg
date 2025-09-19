# Migração de Assets - Guia de Implementação

## 📋 Resumo da Migração

Os arquivos de mídia foram movidos para um repositório separado para otimizar o projeto principal. Este documento detalha as mudanças e como implementar o repositório de assets.

## 🗂️ Arquivos Movidos

### Do diretório `public/`:
- `TORCIDA.png` → `assets/logos/TORCIDA.png`
- `TRAN1.png` → `assets/logos/TRAN1.png`
- `SL1.png` → `assets/slides/SL1.png`
- `SL2.png` → `assets/slides/SL2.png`
- `SL3.png` → `assets/slides/SL3.png`

### Arquivos SVG não utilizados (podem ser removidos):
- `1.svg`, `1 copy.svg`, `1 copy copy.svg`
- `2.svg`, `2 copy.svg`, `2 copy copy.svg`
- `3.svg`, `3 copy.svg`, `3 copy copy.svg`

## 🚀 Implementação do Repositório de Assets

### 1. Criar Repositório no GitHub
```bash
# Criar novo repositório
gh repo create torcidafazop/assets --public

# Clonar localmente
git clone https://github.com/torcidafazop/assets.git
cd assets
```

### 2. Estrutura de Diretórios
```
assets/
├── logos/
│   ├── TORCIDA.png
│   └── TRAN1.png
├── slides/
│   ├── SL1.png
│   ├── SL2.png
│   └── SL3.png
├── products/
│   └── (futuras imagens de produtos)
└── README.md
```

### 3. Upload dos Arquivos
```bash
# Copiar arquivos do projeto principal
mkdir -p logos slides
cp ../portal-tfp/public/TORCIDA.png logos/
cp ../portal-tfp/public/TRAN1.png logos/
cp ../portal-tfp/public/SL1.png slides/
cp ../portal-tfp/public/SL2.png slides/
cp ../portal-tfp/public/SL3.png slides/

# Commit e push
git add .
git commit -m "feat: add initial assets from main project"
git push origin main
```

## 🔧 Mudanças no Código

### Arquivos Modificados:
1. **`src/constants/assets.ts`** - Novo arquivo com URLs dos assets
2. **`src/constants/index.ts`** - Atualizado para usar assets externos
3. **`src/components/Header.tsx`** - Logo atualizado
4. **`src/components/TransitionOverlay.tsx`** - Imagem de transição atualizada
5. **`src/components/NewsSidebar.tsx`** - Imagens organizadas
6. **`src/components/sections/NewsSection.tsx`** - Thumbnails atualizados
7. **`src/data/storeData.ts`** - Imagens de produtos organizadas
8. **`.gitignore`** - Adicionado para ignorar assets locais

## 🌐 URLs dos Assets

**Base URL**: `https://raw.githubusercontent.com/torcidafazop/assets/main`

### Exemplos:
- Logo: `https://raw.githubusercontent.com/torcidafazop/assets/main/logos/TORCIDA.png`
- Slide 1: `https://raw.githubusercontent.com/torcidafazop/assets/main/slides/SL1.png`

## ✅ Benefícios da Migração

1. **Projeto Principal Mais Leve**: Redução significativa do tamanho do repositório
2. **Melhor Performance**: Assets servidos via CDN do GitHub
3. **Organização**: Separação clara entre código e mídia
4. **Versionamento**: Assets podem ser versionados independentemente
5. **Colaboração**: Designers podem contribuir apenas com assets
6. **Cache**: Melhor cache de assets estáticos

## 🔄 Fallbacks

O código inclui tratamento de erro para imagens:
- Se uma imagem externa falhar, usa placeholder do Pexels
- Logs de erro para debugging
- Graceful degradation da UI

## 📝 Próximos Passos

1. Criar o repositório `torcidafazop/assets`
2. Fazer upload dos arquivos seguindo a estrutura
3. Testar todas as imagens no ambiente de desenvolvimento
4. Remover arquivos antigos do diretório `public/`
5. Atualizar documentação se necessário

## 🚨 Importante

- Manter o repositório de assets público para acesso via CDN
- Usar nomes de arquivo consistentes e descritivos
- Otimizar imagens antes do upload (compressão, formato adequado)
- Considerar usar WebP para melhor performance no futuro