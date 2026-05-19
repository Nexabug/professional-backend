const asynchandler = (reqhandler) =>{
    (req,res,next) =>{
        Promise.resolve(reqhandler(reqhandler(req,res,next)))
        .catch((err)=>{
            next(err)
        })
    }
}


export {asynchandler}