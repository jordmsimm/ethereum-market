import React from 'react'
import ipfs from '../util/ipfs/ipfs';



class Test extends React.Component{
    state={
        output:''
    }
        
   
    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };

    handleToggleForm = (e) =>{
        e.preventDefault();
        const showForm = !this.state.showForm;
        this.setState(() => ({showForm}))
    }
    async onSubmit(e){
        e.preventDefault();
        const data = JSON.stringify({
            name: e.target.elements.name.value
          });
        const ipfsData = await Buffer.from(data);
        let ipfsHash;
        await ipfs.add(ipfsData, (err, ipfsHash) => {
            console.log(err,ipfsHash);
            if(err){
                console.log(err)
            }else{
                console.log(ipfsHash[0].hash)
                ipfsHash = ipfsHash[0].hash;
                 ipfs.cat(ipfsHash, (err, res) => {
                    console.log(err,ipfsHash);
                    if(err){
                        console.log(err)
                    }else{
                        const myData = JSON.parse(res.toString('utf8'))
                        console.log(myData)
                        console.log(myData.name)
                        
                    }
                    //storeFront.ipfsHash = ipfsHash[0].hash
                })
            }
            //storeFront.ipfsHash = ipfsHash[0].hash
        })
        

        
    }
    //0xb3f89ac8c2c296a7ff75e2226a8f591e848aced8
    render(){
        return (
            <div>
                <p>Test form</p>
               <form onSubmit={this.onSubmit}>
                    <input type='text' name='name' />
                    <input type='number' name='num' />
                    <button type='submit'>submit tests</button>
               </form>
                
            </div>
        ) ;
    }
}



export default Test;

//export default Dashboard
