import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_ANON_KEY
);


export default async function handler(req,res){

if(req.method==="GET"){

const {data,error}=await supabase
.from("reviews")
.select("*")
.eq("aprobado",true)
.order("created_at",{ascending:false});


return res.status(200).json({
data,
error
});

}


if(req.method==="POST"){

const {
nombre,
comentario,
estrellas
}=req.body;


const {data,error}=await supabase
.from("reviews")
.insert([
{
nombre,
comentario,
estrellas,
aprobado:false
}
]);


return res.status(200).json({
data,
error
});

}


return res.status(405).json({
error:"Método no permitido"
});

}