<<<<<<< HEAD
// MOCHA Testing Framework and CHAI Assertion library
const SSSDapp = artifacts.require("SSSDapp");
// configure chai
require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("SSSDapp", accounts => {
  // write test here
  let sssdapp;
  // run before every test
  before(async () => {
    sssdapp = await SSSDapp.deployed();
  });
  // deployed successfuly , addresss is not empty, undefined,null
  describe("deployment", async () => {
    it("deploys successfult", async () => {
      const address = sssdapp.address;
      assert.notEqual(address, "0x0");
      assert.notEqual(address, "");
      assert.notEqual(address, "null");
      assert.notEqual(address, "undefined");
      console.log(address);
    });
  });
  // get and set functions functioning
  describe("storage", async () => {
    it("updates the ipfsHash ", async () => {
      let ipfsHash;
      ipfsHash = "abc123";
      await sssdapp.set(ipfsHash);
      const result = await sssdapp.get();
      assert.equal(result, ipfsHash);
    });
  });
});
=======
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
>>>>>>> bba824979674985594ca32d0368400240e6f4b73
