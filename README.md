# HortiFácil App

Este projeto é um aplicativo de hortifruti desenvolvido em React Native + Expo. Abaixo estão listados os componentes principais utilizados.

## Componentes React Native

- **SafeAreaView** (`react-native-safe-area-context`): Área segura para iOS/Android.
- **View**: Container genérico para layout.
- **Text**: Exibição de textos.
- **TextInput**: Campos de entrada de texto (e-mail, senha, endereço etc.).
- **TouchableOpacity**: Botões e áreas clicáveis.
- **Image**: Exibição de imagens (logos, produtos, placeholder).
- **FlatList**: Listagem eficiente de itens (lojas, produtos, endereços, carrinho).
- **ScrollView**: Rolagem vertical para telas como Perfil.
- **Switch**: Alternar estado (ex: endereço sem número).
- **Alert**: Exibir alertas/modal de confirmação e erro.

## Componentes de Navegação

- **NavigationContainer** (`@react-navigation/native`): Container de navegação.
- **createNativeStackNavigator** (`@react-navigation/native-stack`): Pilha de telas (Login, Signup, Store, etc.).
- **createBottomTabNavigator** (`@react-navigation/bottom-tabs`): Abas principais (Lojas, Carrinho, Perfil).

## Hooks React

- **useState**: Estado local dentro dos componentes.
- **useContext**: Consumo de contexto de carrinho.
- **createContext**: Criação do `CartContext`.
- **useMemo**: Memorizar lista filtrada de produtos.

## Gerenciamento de Estado

- **CartContext**: Contexto próprio para gerenciar itens do carrinho, políticas de entrega, adicionar/remover produtos.

## Bibliotecas Extras

- **@expo/vector-icons**: Ícones (`Feather`, `FontAwesome`, `MaterialCommunityIcons`).
- **react-native-qrcode-svg**: Geração de QR Code para Pix.

---

   ## Integrantes
   Gabriel Alves Queiroz Silva, Samuel de Lira Mendonça, Leandro de Souza Farias, Ademar Neto Seabra Fonseca e Felipe Olimpio Fonseca.

### Como rodar

```bash
npm install
npx expo start
```

> Certifique-se de ter o Expo Go instalado no seu dispositivo para testes em mobile.
