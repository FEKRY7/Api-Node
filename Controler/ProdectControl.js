const Article = require('./../models/Article.js')
const HTTP = require('./../folderS,F,E/S,F,E.JS')
const httperespons = require('./../utilites/httperespons.js')
const auth = require('./../Maddewares/Authenticate.js')

const one = async(req,res)=>{
    try{
        const query = req.query
        const limit = req.query.limit
        const page = req.query.page
        const skip = (page - 1) * limit
        const titank = await Article.find().limit(limit).skip(skip)
       if(!titank){
        httperespons.First(res,[],200,HTTP.FAIL)
       }else{
        httperespons.Second(res,[titank],200,HTTP.SUCCESS) 
       }
    }catch(error) {
        console.error('Error in one:', error);
        httperespons.Third(res, [], 500, HTTP.ERROR);
    }finally {
        res.end();
    }
} 

const tow = async(req,res)=>{
    
    try{
        const zander = req.params.RD
        const titank = await Article.findById(zander)
       if(!titank){
        httperespons.First(res,[],200,HTTP.FAIL)
       }else{
        httperespons.Second(res,[titank],200,HTTP.SUCCESS) 
       }
    }catch(error) {
        console.error('Error in tow:', error);
        httperespons.Third(res, [], 500, HTTP.ERROR);
    }finally {
        res.end();
    }  
}

const three = async(req,res)=>{
    try{
        const resd = req.body
        let token;
if (
req.headers.authorization && req.headers.authorization.startsWith('Bearer')
) {
token = req.headers.authorization.split(' ')[1];
} else if (req.cookies.JWT) {
token = req.cookies.JWT;
}
if (!token) {
return next (
new AppError('your are not logged in, please login to gain access,401')
)
}
        if(token){
            const authtoken = auth(token)
            if(authtoken.type == 'Admin'){
                
                const Monster = req.files.avatar
                const amges1 = []
                const faster = req.files.gallery  
                for (let i=0; i<faster.length;i++){;
                    amges1.push(faster[i].filename)
                }   
                const titank = await Article.create({
                title: resd.title, 
                description: resd.description,
                price: resd.price,
                discountPercentage:resd.discountPercentage,
                rating: resd.rating,
                stock: resd.stock,
                brand: resd.brand,
                category: resd.category,
                avatar:Monster[0].filename,
                gallery:amges1
                })
                 if(!titank){
                            httperespons.First(res,[],200,HTTP.FAIL)
                           }else{
                            httperespons.Second(res,[titank],200,HTTP.SUCCESS) 
                           }
                }else{         
                   httperespons.First(res,['pleas login as Admin'],200,HTTP.FAIL)
                }
        }else{
            httperespons.First(res,['Token is not exit'],200,HTTP.FAIL)
        }
    }catch(error){
        console.error('Error in three:', error);
        httperespons.Third(res, [], 500, HTTP.ERROR);
    }finally {
        res.end();
    }  
}

const four = async (req, res) => {
    try {  
        const zander = req.params.RD;
        console.log(req.body);
        const resd = req.body;
        const titank = await Article.updateMany({ '_id': zander }, {price:resd.price,rating:resd.rating});
        console.log(price);
        if (!titank) {
            httperespons.First(res, [], 200, HTTP.FAIL);
        } else {
            httperespons.Second(res, [titank], 200, HTTP.SUCCESS);
        }
    } catch (error) {
        console.error('Error in four:', error);
        httperespons.Third(res, [], 500, HTTP.ERROR);
    } finally {
        res.end();
    }
};

const sexe = async (req, res) => {
    try {
        const zander = req.params.RD;
        const titank = await Article.findByIdAndDelete(zander);

        if (!titank) {
            httperespons.First(res, [], 200, HTTP.FAIL);
        } else {
            httperespons.Second(res, [titank], 200, HTTP.SUCCESS);
        }
    } catch (error) {
        console.error('Error in sexe:', error);
        httperespons.Third(res, [], 500, HTTP.ERROR);
    } finally {
        res.end();
    }
};

module.exports={
    one,
    tow,
    three,
    four,
    sexe
}