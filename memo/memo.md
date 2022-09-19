ECPairなどを使いアドレスらしき文字列を作成した

　`tiny-secp256k1`, `ecpair`, `bitcoinjs-lib`という３つのパッケージを使ってビットコイン用アドレスらしきものが作成できた。

<!-- more -->

# ブツ

* [リポジトリ][]

[リポジトリ]:https://github.com/ytyaru/Node.js.Ecpair.HelloWorld.20220919113706

## インストール＆実行

```sh
NAME='Node.js.Ecpair.HelloWorld.20220919113706'
git clone https://github.com/ytyaru/$NAME
cd $NAME
npm install
node index.js
```

# プロジェクト作成

```sh
NAME=hello-ecpair
mkdir $NAME
cd $NAME
npm init -y
npm i ecpair tiny-secp256k1 bitcoinjs-lib
```

# ソースコード作成

```sh
vim index.js
```
```javascript
const tinysecp = require('tiny-secp256k1');
const ecpair = require('ecpair');
const bitcoin = require('bitcoinjs-lib');
console.log('tinysecp:', tinysecp)
console.log('ecpair:', ecpair)
console.log('bitcoin:', bitcoin)

const ECPair = ecpair.ECPairFactory(tinysecp)
console.log('ecpair.ECPairFactory(tinysecp):', ECPair)

const key = ECPair.makeRandom()
console.log('ECPair.makeRandom():', key)

console.log(`Pubkey: ${key.publicKey.toString('hex')}`)
console.log(`Privkey: ${key.privateKey.toString('hex')}`)
//console.log(`Privkey: ${key.getAddress()}`)

const address = bitcoin.payments.p2pkh({ pubkey: key.publicKey });
console.log(`address:`, address)
console.log('p2pk:', bitcoin.payments.p2pk({ pubkey: key.publicKey }).address)
console.log('p2pkh:', address.address) // 1JWnvgtw9dcetEFidnQU8BQA53wpm7KZ4b 等
console.log('p2pkh:', bitcoin.payments.p2pkh({ pubkey: key.publicKey }).address)
console.log('p2wpkh', bitcoin.payments.p2wpkh({ pubkey: key.publicKey }).address)
//console.log('p2sh', bitcoin.payments.p2sh({ pubkey: key.publicKey }).address)
const pubKeys = [
    ECPair.makeRandom().publicKey.toString('hex'),
    ECPair.makeRandom().publicKey.toString('hex'),
    ECPair.makeRandom().publicKey.toString('hex'),
]
//console.log('p2ms', bitcoin.payments.p2ms({ m: 2, pubKeys }).address) // TypeError: Not enough data
//console.log('p2sh', bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2ms({ m: 2, pubKeys }) }).address)
//console.log('p2wsh', bitcoin.payments.p2wsh({ pubkey: key.publicKey }).address)
console.log('p2sh, p2ms, p2wsh はエラー。')
```

# 実行

```sh
node index.js
```

# 結果

```sh
tinysecp: {
  __initializeContext: [Function: __initializeContext],
  isPoint: [Function: isPoint],
  isPointCompressed: [Function: isPointCompressed],
  isXOnlyPoint: [Function: isXOnlyPoint],
  isPrivate: [Function: isPrivate],
  pointAdd: [Function: pointAdd],
  pointAddScalar: [Function: pointAddScalar],
  pointCompress: [Function: pointCompress],
  pointFromScalar: [Function: pointFromScalar],
  xOnlyPointFromScalar: [Function: xOnlyPointFromScalar],
  xOnlyPointFromPoint: [Function: xOnlyPointFromPoint],
  pointMultiply: [Function: pointMultiply],
  privateAdd: [Function: privateAdd],
  privateSub: [Function: privateSub],
  privateNegate: [Function: privateNegate],
  xOnlyPointAddTweak: [Function: xOnlyPointAddTweak],
  xOnlyPointAddTweakCheck: [Function: xOnlyPointAddTweakCheck],
  sign: [Function: sign],
  signRecoverable: [Function: signRecoverable],
  signSchnorr: [Function: signSchnorr],
  verify: [Function: verify],
  recover: [Function: recover],
  verifySchnorr: [Function: verifySchnorr]
}
ecpair: { default: [Getter], ECPairFactory: [Getter], networks: [Getter] }
bitcoin: {
  address: {
    fromBase58Check: [Function: fromBase58Check],
    fromBech32: [Function: fromBech32],
    toBase58Check: [Function: toBase58Check],
    toBech32: [Function: toBech32],
    fromOutputScript: [Function: fromOutputScript],
    toOutputScript: [Function: toOutputScript]
  },
  crypto: {
    ripemd160: [Function: ripemd160],
    sha1: [Function: sha1],
    sha256: [Function: sha256],
    hash160: [Function: hash160],
    hash256: [Function: hash256],
    taggedHash: [Function: taggedHash]
  },
  networks: {
    bitcoin: {
      messagePrefix: '\x18Bitcoin Signed Message:\n',
      bech32: 'bc',
      bip32: [Object],
      pubKeyHash: 0,
      scriptHash: 5,
      wif: 128
    },
    regtest: {
      messagePrefix: '\x18Bitcoin Signed Message:\n',
      bech32: 'bcrt',
      bip32: [Object],
      pubKeyHash: 111,
      scriptHash: 196,
      wif: 239
    },
    testnet: {
      messagePrefix: '\x18Bitcoin Signed Message:\n',
      bech32: 'tb',
      bip32: [Object],
      pubKeyHash: 111,
      scriptHash: 196,
      wif: 239
    }
  },
  payments: {
    embed: [Getter],
    p2ms: [Getter],
    p2pk: [Getter],
    p2pkh: [Getter],
    p2sh: [Getter],
    p2wpkh: [Getter],
    p2wsh: [Getter]
  },
  script: {
    OPS: [Getter],
    isPushOnly: [Function: isPushOnly],
    compile: [Function: compile],
    decompile: [Function: decompile],
    toASM: [Function: toASM],
    fromASM: [Function: fromASM],
    toStack: [Function: toStack],
    isCanonicalPubKey: [Function: isCanonicalPubKey],
    isDefinedHashType: [Function: isDefinedHashType],
    isCanonicalScriptSignature: [Function: isCanonicalScriptSignature],
    number: { decode: [Function: decode], encode: [Function: encode] },
    signature: { decode: [Function: decode], encode: [Function: encode] }
  },
  Block: [Getter],
  Psbt: [Getter],
  opcodes: [Getter],
  Transaction: [Getter]
}
ecpair.ECPairFactory(tinysecp): {
  isPoint: [Function: isPoint],
  fromPrivateKey: [Function: fromPrivateKey],
  fromPublicKey: [Function: fromPublicKey],
  fromWIF: [Function: fromWIF],
  makeRandom: [Function: makeRandom]
}
ECPair.makeRandom(): ECPair {
  __D: <Buffer 3f b2 25 d4 ff 04 31 85 d5 2b 8b 50 bc a6 9a db fb fd 9f 52 77 9a 31 4c 42 6f dc fd e0 a4 ef c2>,
  __Q: undefined,
  compressed: true,
  network: {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: { public: 76067358, private: 76066276 },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128
  },
  lowR: false
}
Pubkey: 02273ec3dd96e7c15be02409664e99aa8b4f0a0187f6ab12bead6733716d1893bc
Privkey: 3fb225d4ff043185d52b8b50bca69adbfbfd9f52779a314c426fdcfde0a4efc2
address: {
  name: 'p2pkh',
  network: {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'bc',
    bip32: { public: 76067358, private: 76066276 },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128
  },
  address: [Getter/Setter],
  hash: [Getter/Setter],
  output: [Getter/Setter],
  pubkey: <Buffer 02 27 3e c3 dd 96 e7 c1 5b e0 24 09 66 4e 99 aa 8b 4f 0a 01 87 f6 ab 12 be ad 67 33 71 6d 18 93 bc>,
  signature: [Getter/Setter],
  input: [Getter/Setter],
  witness: [Getter/Setter]
}
p2pk: undefined
p2pkh: 1BaZjMXFnbuRp14krTBSQEGK3yciVGyZtX
p2pkh: 1BaZjMXFnbuRp14krTBSQEGK3yciVGyZtX
p2wpkh bc1qws9yuurmtqnempe6nj0ng0umz6q5pktm0dgsnm
p2sh, p2ms, p2wsh はエラー。
```

# 解析

　最後の出力部分がアドレス。

　アドレスを作成するには`bitcoinjs-lib`の以下メソッドを使う。

```sh
  payments: {
    embed: [Getter],
    p2ms: [Getter],
    p2pk: [Getter],
    p2pkh: [Getter],
    p2sh: [Getter],
    p2wpkh: [Getter],
    p2wsh: [Getter]
  },
```

　このうち有効であり一般的らしい`p2pkh`に注目する。これはMasteringBitcoin PDF 129ページにある「標準的なトランザクション」のひとつ。

```javascript
const ECPair = ecpair.ECPairFactory(tinysecp)
const key = ECPair.makeRandom()
console.log('p2pkh:', bitcoin.payments.p2pkh({ pubkey: key.publicKey }).address)
```

　`P2なんちゃら`をPDFで読んだりさらっとググった結果、次のようなものだった。

名前|概要
----|----
`P2PKH`|一般的。`locking script`を含む。
`P2PK`|`P2PKH`よりシンプル。公開鍵を`locking script`にする。
`P2MS`|マルチシグネチャ。少なくとも2個以上の署名が必要。
`P2SH`|新しい。`script`を簡単化した。`redeem script`
`P2WPKH`|SegWit版`P2PKH`
`P2WSH`|SegWit版`P2SH`

　ぶっちゃけ何もわからない。コードを書いても未だに何がどうなっているのかわからない。ただ動作するメソッドを呼び出しただけ。たぶん`bitcoin.payments.p2pk()`の出力結果をみるに、`input`や`output`があるから、そこに送金元・送金先となるトランザクションデータを設定して、どこかへ送信し承認されたら取引完了になると思われる。

　まあとにかく、`tiny-secp256k1`, `ecpair`, `bitcoinjs-lib`という３つのパッケージを使ってアドレスらしきものが作成できた。

　これでウォレット作れたりするのかな？　アドレス作って送受金してみたいけど、できるかどうかもわからない。

　その前に、モナコインのアドレスってどうやって作るの？　ログにあった`p2wpkh bc1qws9yuurmtqnempe6nj0ng0umz6q5pktm0dgsnm`は先頭`bc`だからビットコイン用アドレスなのかな？　Mpurseだと`M`からはじまるアドレスが作成できるはずだけど。それって作れるのかな？

　もっと調査が必要そう。

