const express = require("express");

const app = express();

app.use(express.json());


const users = [

    {name: 'Adam', kidneys:[{healthy: false}]}

]

//To Get data on Kidneys 

app.get('/', function(req,res){


    let numberOfHealthyKidneys = 0;

    for(let i=0; i<users[0].kidneys.length; i++){

        if(users[0].kidneys[i].healthy){


            numberOfHealthyKidneys+=1;
        }
    }

    let numberOfUnHealthyKidneys = users[0].kidneys.length - numberOfHealthyKidneys;

    res.json({name: users[0].name, kidneys: users[0].kidneys.length, 
    
                 numberOfHealthyKidneys: numberOfHealthyKidneys,
                
                numberOfUnHealthyKidneys: numberOfUnHealthyKidneys});
})

//To add a new healthy Kidney 

app.post('/', function(req, res){

    let hQuery = req.body.hQuery;

    users[0].kidneys.push({healthy: hQuery})


    res.json({

        msg: "Kidney added!"
    })


})


//To replace a damaged Kidney with Healthy Kidney... If there's already healthy kidneys, dont replace

app.put('/', function(req, res){

    if(areAllKidneysHealthy()){

        res.status(411).json({msg: "All your Kidneys are Healthy. No need to replace any Kidney"})
    }

    else {

        if(isThereAtleastOneDamagedKidney()){

            let healthyKidneys = [];

            // let damagedKidneysPurified = [];

            for(let i=0; i<users[0].kidneys.length; i++){

                if(users[0].kidneys[i].healthy){

                    healthyKidneys.push({

                        healthy: true
                    })


                }

                //Replacing Damaged Kidneys

                else {



                    healthyKidneys.push({

                        healthy: true
                    }

                    )

                




                }
            }

            users[0].kidneys = healthyKidneys;
        }


        res.json({msg: "All damaged Kidneys were replaced by New Kidneys"})

        
    }

   


    function areAllKidneysHealthy(){

        let allKidneysHealthy = false;

        let totalKidneys = users[0].kidneys.length;

        let healthyKidneys = 0;

        for(i=0; i<users[0].kidneys.length; i++){

            if(users[0].kidneys[i].healthy){

                healthyKidneys +=1


            }

        }

        

        
        if (totalKidneys==healthyKidneys){

            allKidneysHealthy = true;


        }

        return allKidneysHealthy;




        }

    
    
    
    function isThereAtleastOneDamagedKidney(){

        let atleastOneDamagedKidney = false;

        for(let i=0; i<users[0].kidneys.length; i++){

            if(users[0].kidneys[i].healthy==false){

                atleastOneDamagedKidney = true;


            }
        }

        return atleastOneDamagedKidney;
    }
    


    

    
})


//To delete a damaged Kidney

app.delete('/', function(req, res){


    if(isThereAtleastOneDamagedKidney()){


        let newKidneys = [];

        for(let i=0; i<users[0].kidneys.length; i++){

            if(users[0].kidneys[i].healthy==true){

                newKidneys.push(users[0].kidneys[i]);
            }


        }

        users[0].kidneys = newKidneys;

        res.json({

            msg: "Removed all the Damaged Kidneys Succesfully"
        })
    


    }


    else {

        res.status(411).json("You have no damaged Kidneys to Delete/Remove");
    }




    function isThereAtleastOneDamagedKidney() {


        let atleastOneDamagedKidney = false;

        for(let i=0; i<users[0].kidneys.length; i++){

            if(users[0].kidneys[i].healthy==false){

                atleastOneDamagedKidney = true;
            }
        }

        return atleastOneDamagedKidney;






    }

 

})



app.listen(3000);
