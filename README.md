# React で電卓（足し算のみ）

これは新入生に向けに作った React チュートリアルです．  
このリポジトリのコードが完成品です． ご質問等は`@shimehituzi`まで

[toc]

## 必要な要件

- コマンドラインが使用できる
- node.js がインストールされている．

## 環境

以下のコマンドを実行すると React のプロジェクトが作成されます．

```sh
$ npx create-react-app dentaku
```

入力できるようになったら．以下のコマンドでディレクトリを移動します．  
そして `yarn start` で React を起動します．  
ブラウザに React のアイコンがでていれば成功です．  
今回は一回 React を終了させましょう．  
コントロールキーを押しながら C を押せば終了します．

```sh
$ cd dentaku
$ yarn start
```

お気に入りのエディターで `dentaku/src` というフォルダを開きましょう．  
今開いた `src` というフォルダの中身を全部削除しましょう．

## React のコードを書いていく

### 1. まずはエラーにならないようにしよう．

`src` フォルダの直下に `index.js`, `App.js` を作ります．

`src` のフォルダの中に `index.js` というファイルがないと， React は動きません．  
この `index.js` にコードを書いてもいいのですが，  
今回は `App.js` というファイルを作りこの中にコードを書いていきます．

`App.js` に以下の内容を記述します．

```js
import React from 'react'   // react を React という名前でインポート

const App = () => {         // App という定数に中括弧内で定義される関数を代入
  return (
    <div>Hello World</div>  // この関数の返り値． React のコンポーネントでは html タグを返さなければいけない
  )
}

export default App          // 関数が代入された定数 App をデフォルトエクスポート
```

この App を React では**コンポーネント**（厳密には関数コンポーネント）と呼びます．

`index.js` に以下の内容を記述します．

```js
import React from 'react'           // react を React という名前でインポート
import { render } from 'react-dom'  // react-dom の render をインポート
import App from './App'             // App.js のデフォルトエクスポートを App という名前でインポート

render(<App/>, document.getElementById('root'))  // App をレンダリングします
```

これでコマンドラインで `yarn start` を行います．  
ブラウザに Hello World と表示されていれば成功です．

### 2. 電卓の見た目を作っていこう

#### 電卓の概要

今回の電卓には3種類のボタンと2種類の表示枠があります．  
一般的な電卓とはかなり異なりますが．簡単のための処置です．

ボタンは以下の3つです．
- 数字ボタン (0 から 9)
- プラスボタン
- イコールボタン

表示枠は以下の2つです．
- インプット枠 （入力した数字を表示）
- リザルト枠 （計算した答えを表示）

React ではこれらの一つのパーツに対して一つのファイルでプログラムを書いていきます．

#### 電卓のパーツ作成

なので以下の5つのファイルを `src` の直下に作成します．  
`Number.js`, `Plus.js`, `Equal.js`, `Input.js`, `Result.js`

さて機能はあとでつけるので見た目を作っていきましょう．

基本的に以下のテンプレートの return 部分のみを変えたものになります．

```js
import React from 'react'

export const (ファイル名から.jsを除いたもの) = () => {
  return (
    ここに見た目を書く  // html タグ形式
  )
}
```

以下のようにそれぞれのファイルに記述します

`Number.js` 

```js
import React from 'react'

export const Number = (props) => {  // (1) props は後述します
  return (
    <button>{props.number}</button> // (2) {} で囲むことで括弧内を javascript の式として評価できる
  )
}
```

`Plus.js`
```js
import React from 'react'

export const Plus = () => {
  return (
    <button>+</button>
  )
}
```

`Equal.js`
```js
import React from 'react'

export const Equal = () => {
  return (
    <button>=</button>
  )
}
```

`Input.js`
```js
import React from 'react'

export const Input = () => {
  return (
    <div>0</div>
  )
}
```

`Result.js`
```js
import React from 'react'

export const Result = () => {
  return (
    <div>Result: 0</div>
  )
}
```

#### 電卓パーツの組み立て

では電卓のパーツが出来上がったので電卓を組み立てましょう．  
組み立て場所は `App.js` です．

`App.js` を以下のように編集しましょう．

`App.js`
```js
import React from 'react'
import { Number } from './Number'
import { Plus } from './Plus'
import { Equal } from './Equal'
import { Result } from './Result'
import { Input } from './Input'

const App = () => {
  return (
    <div>
      <div>
        <Number number={1}/>
        <Number number={2}/>
        <Number number={3}/>
      </div>
      <div>
        <Number number={4}/>
        <Number number={5}/>
        <Number number={6}/>
      </div>
      <div>
        <Number number={7}/>
        <Number number={8}/>
        <Number number={9}/>
      </div>
      <div>
        <Number number={0}/>
        <Plus/>
        <Equal/>
      </div>
      <div>
        <Input/>
      </div>
      <div>
        <Result/>
      </div>
    </div>
  )
}

export default App
```

変更点は `import` 部分と `return` 部分です．  

先ほど作成した5つのパーツのファイルは `import` しなければこの `App.js` では使えません．  
次に `return` 部分です．`div` は縦並びなので横に並べたい部分を `div` の中に入れます．
React のコンポーネントは『一つのタグ』（厳密には『一つのJSX.Element』) を返さなくてはいけないので，
一番外側の `div` は `return` されるタグを一つにまとめるための処置です．

最後に `props` の説明をします．（`Number.js` のコメント (1), (2) 部分参照）  

`Number.js` の (1) は `(props)` と書かれていますが，これは `Number` という定数に代入する関数の引数です．
つまり Number コンポーネントは引数を取るタイプのコンポーネントなのです．  
`App.js` を見ると Number コンポーネントの呼び出し時に， `number={数字}` と記述しています．
このように記述することで Number コンポーネント内で `props.number` とすることで，
括弧内のデータにアクセスできます．（今回は`数字`）．  
結果として，`Number.js` ではボタンの中に `数字` を埋め込んで表示するのです．

### 3. 電卓に機能をつけたそう
