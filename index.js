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
].map(hex => Buffer.from(hex, 'hex'))
console.log('p2ms', bitcoin.payments.p2ms({ m: 2, pubKeys }).address) // TypeError: Not enough data
console.log('p2sh', bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2ms({ m: 2, pubKeys }) }).address)
console.log('p2wsh', bitcoin.payments.p2wsh({ pubkey: key.publicKey }).address)
//console.log('p2ms', bitcoin.payments.p2ms({ m: 2, pubKeys }).address) // TypeError: Not enough data
//console.log('p2sh', bitcoin.payments.p2sh({ redeem: bitcoin.payments.p2ms({ m: 2, pubKeys }) }).address)
//console.log('p2wsh', bitcoin.payments.p2wsh({ pubkey: key.publicKey }).address)
console.log('p2sh, p2ms, p2wsh はエラー。')
