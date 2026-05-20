so to hamara async function ek promise return kar ke deta hai to ahmab karenge ye ki ispe ham .then and .catch laga kar age badhenge

agar connection succefull ho gya to hame app ko start kar dena chaiy ena listen ke liye to wahi kar rahe hai yaha pe

to hamne yaha pe 2 naye pkg dowload kiye hai first cookie-parser and cors

to hame jab bhi koi configuration ya middleware set karna ho to ham `app.use()` ka use kare hai

to ham is me kar rah rahe hai ab hamre pass data bahut jagah se ayega to usko kaise handle kar uske liye ham ye sab prepration kar rahr hai pahle se 

to cors yaha kar yah raha hai ki sirf wo hamar jo origin hai usko hi allow karega ki backend se baat kar paye baki koi aur nhi and creeintial true means jo jo browser hai wo cookies and session id jaise credition bhi bhej skta hai hamre pass iske liye uskok allow kar diya hai

what is the middlewares 
ex:- hamne ig pe user search kiya to wo result dikhne se 
pahle ye check karega ki kya me us info ke liye worthy hu bhi ya nhi like , kya me owner hu , kya me logged in hu ya nhi

like issi trah ke ke cheking karte hai

to hamne jo pahle padha tha ki 2 parameter hote hai (req,res)  nhi yaha pe 4 parameter hote hai like (err,req,res,next)

next hamar ye ek flag hai ki ye bata hai ki us hisse kaa kam ho gya hai isliye isko istam ham sirf middleware me karte hai

to ham db se har time baat karne wale hai to usko har jagh baar likhne ki jagah ham usko utlis me rakh dete hai

to hamne ek async handler fun banya hai jo ek wrrper ki trah kaam karega and wo hame promise dega hgar sussceful ho gya to jo function hai wo usko chala dega and agr fail ho gya to cath kar lega 


