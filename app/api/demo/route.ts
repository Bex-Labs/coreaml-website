import {env} from 'cloudflare:workers';
const topics=['CoreAML demonstration','Core banking solution','Core banking integration','Security and deployment'];
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function POST(request:Request){
 try{
 const origin=request.headers.get('origin');if(!origin||origin!==new URL(request.url).origin)return reply({error:'Please submit this form from the CoreAML website.'},403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return reply({error:'Invalid request format.'},415);
 if(Number(request.headers.get('content-length')||0)>12000)return reply({error:'Request too large.'},413);
 const raw=await request.text();if(raw.length>10000)return reply({error:'Request too large.'},413);const p=JSON.parse(raw);
 if(p.website)return reply({error:'We could not accept this request.'},400);
 const clean=(x:unknown,min:number,max:number)=>typeof x==='string'&&x.trim().length>=min&&x.trim().length<=max?x.trim():null;
 const name=clean(p.name,2,100),email=clean(p.email,3,254)?.toLowerCase(),institution=clean(p.institution,2,160),role=clean(p.role,2,100),country=clean(p.country,2,80),notes=clean(p.notes??'',0,1500);
 if(!name||!email||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||!institution||!role||!country||notes===null||!topics.includes(p.topic)||p.consent!==true||typeof p.requestId!=='string'||!/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(p.requestId))return reply({error:'Please complete the required fields and consent checkbox.'},400);
 if(!env.DB)return reply({error:'Demo requests are temporarily unavailable. Please try again later.'},503);
 const previous=await env.DB.prepare('SELECT reference,email,name,institution,role,country,topic,notes FROM demo_requests WHERE id=?').bind(p.requestId).first<Record<string,string>>();
 if(previous){if(previous.email!==email||previous.name!==name||previous.institution!==institution||previous.role!==role||previous.country!==country||previous.topic!==p.topic||previous.notes!==notes)return reply({error:'This reference belongs to a different request. Please edit the details and submit again.'},409);return reply({reference:previous.reference});}
 const cutoff=new Date(Date.now()-3600000).toISOString();const recent=await env.DB.prepare('SELECT count(*) AS total FROM demo_requests WHERE email=? AND created_at>?').bind(email,cutoff).first<{total:number}>();if((recent?.total||0)>=3)return reply({error:'You have already submitted several requests. Please try again later.'},429);
 const reference='CA-'+p.requestId.toUpperCase();await env.DB.prepare('INSERT INTO demo_requests (id,reference,name,email,institution,role,country,topic,notes,consent,consent_version,created_at,status) VALUES (?,?,?,?,?,?,?,?,?,1,?,?,?)').bind(p.requestId,reference,name,email,institution,role,country,p.topic,notes,'demo-contact-v1',new Date().toISOString(),'new').run();
 return reply({reference},201);
 }catch{return reply({error:'We could not confirm your request. Retry to confirm the same submission.'},503);}
}
