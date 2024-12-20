# Roteiros Fácil - Gerador de Roteiros de Viagem com IA

**Roteiros Fácil** é um aplicativo desenvolvido com **React Native** e **Expo** que gera roteiros personalizados para viagens utilizando **Gemini AI**. O aplicativo solicita o nome da cidade e o número de dias da viagem e cria um roteiro detalhado com base em informações turísticas fornecidas pela IA.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis nativos.
- **Expo**: Ferramenta para facilitar o desenvolvimento e a construção de aplicativos React Native.
- **Gemini AI**: Plataforma de inteligência artificial utilizada para gerar conteúdo de roteiros personalizados.
- **@react-native-community/slider**: Componente para controle deslizante (slider) para definir o número de dias de viagem.
- **Material Icons**: Biblioteca de ícones para a interface do usuário.
- **react-native-dotenv**: Biblioteca para carregar variáveis de ambiente de um arquivo `.env`.

## Funcionalidades

- **Geração de Roteiros**: O aplicativo gera um roteiro para uma viagem com base na cidade e número de dias informados.
- **Personalização**: O usuário pode ajustar o número de dias de viagem com um controle deslizante.
- **Integração com Gemini AI**: A inteligência artificial cria um roteiro detalhado com locais turísticos, oferecendo uma experiência personalizada.
- **Interface Intuitiva**: A interface é simples e direta, permitindo uma experiência de usuário fluida.

## Como Funciona

1. O usuário informa o nome da cidade de destino.
2. O usuário ajusta o número de dias da viagem usando um controle deslizante.
3. Ao clicar em "Gerar Roteiro", a IA do Gemini gera um roteiro detalhado com pontos turísticos para os dias informados.
4. O roteiro é exibido na tela, em tópicos, detalhando o que fazer em cada dia da viagem.

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter os seguintes requisitos:

- Node.js (preferencialmente versão 16 ou superior)
- Expo CLI

## Como Rodar o Projeto

### 1. Clonar o repositório

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/SEU_USUARIO/roteiros-facil.git
