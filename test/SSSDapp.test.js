const SSSDapp = artifacts.require("SSSDapp");

require('chai')
 .use(require("chai-as-promised"))
 .should()


 contract('SSSDapp',(accounts) =>{
  // write tsdt here
  let sssdapp;

  before(async () =>{
   sssdapp = await SSSDapp.deployed();
   
  })

  describe('deploymeny', async() =>{
   it('deploys successfult', async () =>{
     
  const address = sssdapp.address;
  assert.notEqual(address, '0x0')
  assert.notEqual(address, '')
  assert.notEqual(address, 'null')
  assert.notEqual(address, 'undefined')
  console.log(address)
 })
})
 describe('storage', async() =>{

  it('updates the ipfsHash ', async() => {
   
   let ipfsHash
   ipfsHash = 'abc123'
   await sssdapp.set(ipfsHash)
   const result = await sssdapp.get()
   assert.equal(result,ipfsHash)




  } )
 })
 })