# Convite de Oradores

Aplicativo PWA para gerar convites de discursos públicos, mensagens para WhatsApp, arquivos HTML, PDF e agenda.

## Versão

1.3 — ao clicar em **Enviar pelo WhatsApp**, o sistema baixa automaticamente o convite HTML com nome padronizado e abre a conversa com a mensagem pronta. O arquivo recém-baixado fica entre os itens mais recentes da pasta de downloads, facilitando o anexo manual.

## Principais recursos

- Geração individual e em lote
- Envio da mensagem para o WhatsApp com download automático do convite HTML
- Opção alternativa para copiar a mensagem
- Geração do convite completo em HTML com nome padronizado
- Geração de PDF e arquivo de agenda
- Ações no HTML para agenda, navegação, JW Hub e contato

## Estrutura

- `index.html` — página principal
- `css/styles.css` — estilos do aplicativo
- `js/app.js` — lógica, geração dos convites e PDF
- `assets/icons/icon.svg` — ícone do aplicativo
- `docs/Lista_atualizada_dos_esbocos.txt` — referência dos esboços
- `manifest.webmanifest` — configuração da PWA
- `sw.js` — funcionamento offline e cache

## Publicação

O projeto está preparado para ser publicado diretamente pelo GitHub Pages a partir da pasta raiz. As alterações devem ser testadas na branch de desenvolvimento antes de serem mescladas à `main`.
