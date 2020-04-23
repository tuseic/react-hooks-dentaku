# React で電卓（足し算のみ）

これは新入生に向けに作った React チュートリアルです．  
このリポジトリのコードが完成品です． ご質問等は`@shimehituzi`まで

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

### 1 まずはエラーにならないようにしよう．

`src` フォルダの直下に `index.js`, `App.js` を作ります．

`src` のフォルダの中に `index.js` というファイルがないと， React は動きません．  
この `index.js` にコードを書いてもいいのですが，  
今回は `App.js` というファイルを作りこの中にコードを書いていきます．

`App.js` に以下の内容を記述します．

```jsx
import React from 'react'   // react を React という名前でインポート

const App = () => {         // App という定数に中括弧内で定義される関数を代入
  return (
    <div>Hello World</div>  // この関数の返り値． React のコンポーネントでは html タグを返さなければいけない
  )
}

export default App          // 関数が代入された定数 App をデフォルトエクスポート
```

この App を React では **コンポーネント** （厳密には関数コンポーネント）と呼びます．  
例えばこの場合 **App コンポーネント**と呼びます．

`index.js` に以下の内容を記述します．

```jsx
import React from 'react'           // react を React という名前でインポート
import { render } from 'react-dom'  // react-dom の render をインポート
import App from './App'             // App.js のデフォルトエクスポートを App という名前でインポート

render(<App/>, document.getElementById('root'))  // App をレンダリングします
```

これでコマンドラインで `yarn start` を行います．  
ブラウザに Hello World と表示されていれば成功です．

### 2 電卓の見た目を作っていこう

#### 2.1 電卓の概要

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

#### 2.2 電卓のパーツ作成

なので以下の5つのファイルを `src` の直下に作成します．  
`Number.js`, `Plus.js`, `Equal.js`, `Input.js`, `Result.js`

さて機能はあとでつけるので見た目を作っていきましょう．

基本的に以下のテンプレートの return 部分のみを変えたものになります．

```jsx
import React from 'react'

export const (ファイル名から.jsを除いたもの) = () => {
  return (
    ここに見た目を書く  // html タグ形式
  )
}
```

以下のようにそれぞれのファイルに記述します

`Number.js` 

```jsx
import React from 'react'

export const Number = (props) => {  // (1) props は後述します
  return (
    <button>{props.number}</button> // (2) {} で囲むことで括弧内を javascript の式として評価できる
  )
}
```

`Plus.js`
```jsx
import React from 'react'

export const Plus = () => {
  return (
    <button>+</button>
  )
}
```

`Equal.js`
```jsx
import React from 'react'

export const Equal = () => {
  return (
    <button>=</button>
  )
}
```

`Input.js`
```jsx
import React from 'react'

export const Input = () => {
  return (
    <div>0</div>
  )
}
```

`Result.js`
```jsx
import React from 'react'

export const Result = () => {
  return (
    <div>Result: 0</div>
  )
}
```

#### 2.3 電卓パーツの組み立て

では電卓のパーツが出来上がったので電卓を組み立てましょう．  
組み立て場所は `App.js` です．

`App.js` を以下のように編集しましょう．

`App.js`
```jsx
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

### 3 電卓に機能をつけたそう

#### 3.1 `useState` について

javascript には変数 `var` が存在しますが，
React において `var` で定義した変数をコンポーネント間でやりとりすることや，
表示の際に用いるのは正しいとは言えません．  
ではどうすれば良いのかというと， `hooks` を使った React アプリでは `useState` を使うべきでしょう．  
（今回作っている React アプリは `hooks` を使うことを前提としています）．  
`useState` は状態を保持してくれる機能です．使い方の例を以下に示します．

```jsx
const [num, setNum] = useState(0)
```

これは javascript の分割代入を使っています．
分割代入の詳細は[このリンク](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)を参照してください．  

`useState(引数)` とすることで `引数` を初期値とした state が生成されます．
この `num` という state は再代入を許可しません（`const` で定義された変数なので）．
`num` の値を変えたい場合は `setNum` を使います．
`setNum` は関数です．例えば `setNum(2)` というコードを実行すると， `num` の値は `2` になります．

#### 3.2 入力した数・計算結果を，`Input` ・ `Resut` に表示しよう

`useState` を使って App コンポーネントに入力した数・計算結果を保持する state を作りましょう．  
以下のように `App.js` を変更しましょう．

`App.js` 
```jsx
import React, { useState } from 'react'
import { Number } from './Number'
import { Plus } from './Plus'
import { Equal } from './Equal'
import { Result } from './Result'
import { Input } from './Input'

const App = () => {
  const [input, setInput] = useState(0)
  const [result, setResult] = useState(0)

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
        <Input input={input}/>
      </div>
      <div>
        <Result result={result}/>
      </div>
    </div>
  )
}

export default App
```

`useState` はインポートしないと使えないので気をつけてください．

`useState` などの表示しない javascript のコードは Appコンポーネント内の `return` 以前に書きましょう．

`<Input input={input}/>` とすることで，Input コンポーネント内で，  
`props.input` という具合に useState の `input` の値を用いることができます．  
`<Result result={result}/>` も同様です．

ではこの `input` と `result` の値を正しく表示するために，
`Input.js` と `Result.js` を以下のように編集しましょう．

`Input.js`
```jsx
import React from 'react'

export const Input = (props) => {
  return (
    <div>{props.input}</div>
  )
}
```

`Result.js`
```jsx
import React from 'react'

export const Result = (props) => {
  return (
    <div>Result: {props.result}</div>
  )
}
```

見落とした人のためもう一度補足すると， `return` 内で javascript の式を評価したい場合は
その javascript のコードの部分を中括弧 {} で囲います．

今回は state の初期値が 0 のため変更を適用しても表示される内容は変わりません．

#### 3.3 数字のボタン入力を `Input` に反映しよう

例えば 123 を入力したい際は 1 → 2 → 3 の順番でボタンを押します．  
この時以下のように考えると入力を `Input` に反映することができます．

- 1 を押した時 : 1
- 2 を押した時 : 12 = 1 * 10 + 2
- 3 を押した時 : 123 = 12 * 10 + 3

つまり `前の状態 * 10 + 今押した数字` = `input * 10 + number` です．  
これを `setInput` の引数とすれば `input` に反映されます．

Number コンポーネントに以下のように変更を加え以上の内容を適用します．

`Number.js`
```jsx
import React from 'react'

export const Number = (props) => {
  const clickFunc = () => {
    props.setInput(props.input * 10 + props.number)
  }

  return (
    <button onClick={clickFunc}>{props.number}</button>
  )
}
```

ここでは `clickFunc` という定数に引数の無い関数を代入しています．  
各変数を `props` 経由で参照している以外，関数の内容は先に説明したものと同じです．

さて，関数を定義しただけでは，ボタンを押しても数字は入力されません．  
ボタンを押した時にこの関数を呼び出す必要があります．  
この処理は簡単で `<button onClick={clickFunc}>` とするだけで，ボタンの押下時に関数を呼び出せます．

`App.js` の変更点はコードが長いので次の Plus コンポーネント， Equal コンポーネントに関する変更点と共に **3.5** に記します．


#### 3.4 `Plus` ・ `Equal` の機能を実装しよう

最後に `Plus` と `Equal` の機能を実装して，電卓を完成させましょう．

`Plus` では入力した数字 `input` と今までの結果 `result` を足して `result` に反映します．  
そして，`input` を 0 にします．

幸か不幸か `Equal` に関しても全く同じ実装となります．

よってそれぞれのファイルに変更を適用すると以下のようになります．

`Plus.js`
```jsx
import React from 'react'

export const Plus = (props) => {
  const clickFunc = () => {
    props.setResult(props.result + props.input)
    props.setInput(0)
  }

  return (
    <button onClick={clickFunc}>+</button>
  )
}
```

`Equal.js`
```jsx
import React from 'react'

export const Equal = (props) => {
  const clickFunc = () => {
    props.setResult(props.result + props.input)
    props.setInput(0)
  }

  return (
    <button onClick={clickFunc}>=</button>
  )
}
```

この変更は今までの知識で読めると思います．

#### 3.5 `App.js` の変更点

特に新しいこともないので単純にコードを載せます．

```jsx
import React, { useState } from 'react'
import { Number } from './Number'
import { Plus } from './Plus'
import { Equal } from './Equal'
import { Result } from './Result'
import { Input } from './Input'

const App = () => {
  const [input, setInput] = useState(0)
  const [result, setResult] = useState(0)

  return (
    <div>
      <div>
        <Number number={1} input={input} setInput={setInput}/>
        <Number number={2} input={input} setInput={setInput}/>
        <Number number={3} input={input} setInput={setInput}/>
      </div>
      <div>
        <Number number={4} input={input} setInput={setInput}/>
        <Number number={5} input={input} setInput={setInput}/>
        <Number number={6} input={input} setInput={setInput}/>
      </div>
      <div>
        <Number number={7} input={input} setInput={setInput}/>
        <Number number={8} input={input} setInput={setInput}/>
        <Number number={9} input={input} setInput={setInput}/>
      </div>
      <div>
        <Number number={0} input={input} setInput={setInput}/>
        <Plus input={input} result={result} setResult={setResult} setInput={setInput}/>
        <Equal input={input} result={result} setResult={setResult} setInput={setInput}/>
      </div>
      <div>
        <Input input={input}/>
      </div>
      <div>
        <Result result={result}/>
      </div>
    </div>
  )
}

export default App
```

## 完成

以上で完成となります．

見た目の調整，他の演算の追加など，追加できる機能はキリがないと思います．

- Equal を押した後に Number → Plus としても，Equal 以前からの累計になってしまう．
- そもそも Number → Equal → Number が足し算として機能してしまう．

などの問題が Equal にはありますがその辺の修正，  
および機能の追加は各自への課題として良いのではないでしょうか？（適当）

完成形のコードはこのリポジトリの `src` にあります．  
手元のコードが動かないときや，万が一この文章中のコードが間違っていたときはそれを参照してください．
