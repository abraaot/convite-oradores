# Convite de Oradores — versão 1.4

Aplicativo PWA para gerar mensagens de WhatsApp, convites digitais em HTML, PDFs e arquivos de agenda para discursos públicos.

## Novidade da versão 1.4

- `VERSION.txt` passa a ser a fonte única do número da versão publicada.
- O número mostrado no cabeçalho é lido automaticamente desse arquivo.
- O aplicativo verifica se há uma nova versão e oferece o botão **Atualizar agora**.
- O Service Worker usa uma estratégia de atualização mais segura:
  - HTML em modo *network-first*;
  - arquivos estáticos atualizados em segundo plano;
  - limpeza automática dos caches antigos;
  - migração automática do cache da versão 1.3.
- Não é mais necessário limpar manualmente o cache pelo DevTools nas atualizações normais.

## Publicação

Substitua os arquivos do repositório na branch de desenvolvimento, faça commit, envie ao GitHub e incorpore na `main` por Pull Request. O GitHub Pages publicará a nova versão.
