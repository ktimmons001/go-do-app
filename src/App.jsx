import { useState, useEffect, useRef } from "react";

const DEFAULT_CATEGORIES = ["Go Do", "Follow Up", "Call List", "Deadline", "Idea"];
const DEFAULT_REALMS = ["Work", "Home"];
const DEFAULT_STATUSES = ["Open", "In Progress", "Done", "Cancelled"];
const ACTIVE_STATUSES = ["Open", "In Progress"];
const RECURRENCE = ["none","daily","weekdays","weekly","biweekly","monthly"];
const DEFAULT_LEVERS = [
  { name: "Integrated Offering", color: "#E8590C" },
  { name: "Fixed Fee First", color: "#1971C2" },
  { name: "Acceleration + Modernization", color: "#9C36B5" },
  { name: "CEG Lead Gen", color: "#2B8A3E" },
  { name: "CEG Goodwill w/ Sales", color: "#F59F00" },
  { name: "SCD Role", color: "#D6336C" },
];
const LEVER_COLORS = ["#E8590C","#1971C2","#9C36B5","#2B8A3E","#F59F00","#D6336C","#495057","#0B7285","#5C940D","#862E9C"];
const PERSON_COLORS = ["#1971C2","#E8590C","#9C36B5","#2B8A3E","#D6336C","#0B7285","#862E9C","#5C940D","#F59F00","#495057","#C2255C","#1098AD","#7048E8","#E67700","#37B24D"];
const SK = { tasks:"gd-tasks", projects:"gd-projects", levers:"gd-levers", categories:"gd-categories", realms:"gd-realms", owners:"gd-owners" };
const OLD_SK = { tasks:"nb2-tasks", projects:"nb2-projects", levers:"nb2-levers", categories:"nb2-categories", lifeAreas:"nb2-lifeAreas", owners:"nb2-owners" };
const FF = "'Crimson Pro',Georgia,serif";
const FS = "'Work Sans',system-ui,sans-serif";

import { load as ld, save as sv } from "./storage.js"
async function ldM(nk,ok,fb){const n=await ld(nk,null);if(n!==null)return n;if(ok){const o=await ld(ok,null);if(o!==null){await sv(nk,o);return o;}}return fb;}
const uid=()=>`${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
const pColor=name=>{let h=0;for(let i=0;i<name.length;i++)h=name.charCodeAt(i)+((h<<5)-h);return PERSON_COLORS[Math.abs(h)%PERSON_COLORS.length];};
const alphaSort=arr=>[...arr].sort((a,b)=>a.localeCompare(b));
const alphaSortProjects=arr=>[...arr].sort((a,b)=>a.name.localeCompare(b.name));

function Ic({name,size=16,color="currentColor",fill="none"}){
  const p={check:<polyline points="20 6 9 17 4 12"/>,plus:<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,trash:<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></>,star:<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,filter:<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,list:<><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,user:<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,briefcase:<><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></>,settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,sun:<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,layers:<><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,clock:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,chevDown:<polyline points="6 9 12 15 18 9"/>,chevRight:<polyline points="9 18 15 12 9 6"/>,grip:<><circle cx="9" cy="5" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="19" r="1"/></>,phone:<><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></>,archive:<><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></>,rocket:<><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></>,edit:<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,type:<><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>,code:<><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,zap:<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,minimize:<><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></>,maximize:<><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></>,home:<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,undo:<><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></>,repeat:<><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></>};
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p[name]}</svg>;
}

// ─── Next Due Date Calculator ───
function calcNextDue(currentDate, recurrence) {
  const d = currentDate ? new Date(currentDate + "T12:00:00") : new Date();
  switch(recurrence) {
    case "daily": d.setDate(d.getDate()+1); break;
    case "weekdays": d.setDate(d.getDate()+1); while(d.getDay()===0||d.getDay()===6)d.setDate(d.getDate()+1); break;
    case "weekly": d.setDate(d.getDate()+7); break;
    case "biweekly": d.setDate(d.getDate()+14); break;
    case "monthly": d.setMonth(d.getMonth()+1); break;
    default: return "";
  }
  return d.toISOString().split("T")[0];
}

function Tag({label,color="#6b7280",onRemove,small}){return <span style={{display:"inline-flex",alignItems:"center",gap:2,background:color+"18",color,fontSize:small?9:10,fontWeight:600,padding:small?"0px 5px":"1px 7px",borderRadius:99,whiteSpace:"nowrap",fontFamily:FS}}>{label}{onRemove&&<span onClick={e=>{e.stopPropagation();onRemove();}} style={{cursor:"pointer",marginLeft:1,opacity:0.6}}>×</span>}</span>;}
function Dd({value,options,onChange,placeholder,style:s}){return <select value={value||""} onChange={e=>onChange(e.target.value)} style={{border:"1px solid #e2e0db",borderRadius:5,padding:"2px 4px",fontSize:10,fontFamily:FS,background:"#fff",color:"#2c2a25",cursor:"pointer",outline:"none",...s}}>{placeholder&&<option value="">{placeholder}</option>}{options.map(o=><option key={o} value={o}>{o}</option>)}</select>;}
function SH({icon,label,count,color="#2c2a25",sub,empty}){return <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,marginTop:14}}><Ic name={icon} size={13} color={color}/><span style={{fontFamily:FS,fontSize:11,fontWeight:700,color,letterSpacing:"0.04em",textTransform:"uppercase"}}>{label}</span>{count!==undefined&&<span style={{fontSize:10,color:"#9a9690"}}>{count}</span>}{sub&&<span style={{fontSize:10,color:"#b5b0a8",fontStyle:"italic"}}>{sub}</span>}{empty&&<span style={{fontSize:10,color:"#b5b0a8",fontStyle:"italic"}}>— none</span>}</div>;}
function SettingsSection({title,children}){return <div style={{marginBottom:20}}><div style={{fontSize:12,fontWeight:700,color:"#2c2a25",marginBottom:6,fontFamily:FS}}>{title}</div>{children}</div>;}
function InlineAdder({placeholder,onAdd}){const[v,setV]=useState("");const r=useRef(null);const go=()=>{if(v.trim()){onAdd(v.trim());setV("");r.current?.focus();}};return <div style={{display:"flex",gap:4}}><input ref={r} value={v} onChange={e=>setV(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")go();}} placeholder={placeholder} style={{flex:1,minWidth:100,border:"1px solid #e2e0db",borderRadius:5,padding:"4px 8px",fontSize:12,outline:"none",fontFamily:FS}}/><button onClick={go} style={{background:"#2c2a25",color:"#fff",border:"none",borderRadius:5,padding:"4px 10px",fontSize:11,fontWeight:600,cursor:"pointer"}}>Add</button></div>;}
function LeverAdder({onAdd}){const[v,setV]=useState("");const[c,setC]=useState("#E8590C");const r=useRef(null);const go=()=>{if(v.trim()){onAdd(v.trim(),c);setV("");r.current?.focus();}};return <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}><input ref={r} value={v} onChange={e=>setV(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")go();}} placeholder="New lever..." style={{flex:1,minWidth:100,border:"1px solid #e2e0db",borderRadius:5,padding:"4px 8px",fontSize:12,outline:"none",fontFamily:FS}}/><div style={{display:"flex",gap:2,flexWrap:"wrap"}}>{LEVER_COLORS.map(x=><div key={x} onClick={()=>setC(x)} style={{width:18,height:18,borderRadius:4,background:x,cursor:"pointer",border:c===x?"2px solid #2c2a25":"2px solid transparent"}}/>)}</div><button onClick={go} style={{background:"#2c2a25",color:"#fff",border:"none",borderRadius:5,padding:"4px 10px",fontSize:11,fontWeight:600,cursor:"pointer"}}>Add</button></div>;}
function ProjectAdder({levers,onAdd}){const[v,setV]=useState("");const[l,setL]=useState("");const r=useRef(null);const go=()=>{if(v.trim()){onAdd(v.trim(),l);setV("");setL("");r.current?.focus();}};return <div style={{display:"flex",gap:4,alignItems:"center"}}><input ref={r} value={v} onChange={e=>setV(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")go();}} placeholder="New project..." style={{flex:1,border:"1px solid #e2e0db",borderRadius:5,padding:"4px 8px",fontSize:12,outline:"none",fontFamily:FS}}/><Dd value={l} options={levers.map(x=>x.name)} onChange={setL} placeholder="Lever" style={{fontSize:11}}/><button onClick={go} style={{background:"#2c2a25",color:"#fff",border:"none",borderRadius:5,padding:"4px 10px",fontSize:11,fontWeight:600,cursor:"pointer"}}>Add</button></div>;}

// ─── Person Picker (dropdown + inline add) ───
function PersonPicker({value,options,onChange,onAddNew,placeholder="Person",style:s}){
  const[adding,setAdding]=useState(false);const[nv,setNv]=useState("");const ref=useRef(null);
  const commit=()=>{if(nv.trim()){onAddNew(nv.trim());onChange(nv.trim());setNv("");setAdding(false);}};
  if(adding)return <div style={{display:"flex",gap:2,alignItems:"center"}}><input ref={r=>r&&r.focus()} value={nv} onChange={e=>setNv(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")commit();if(e.key==="Escape")setAdding(false);}} onBlur={()=>{if(!nv.trim())setAdding(false);}} placeholder="Name..." style={{border:"1px solid #d4d0c8",borderRadius:4,padding:"2px 5px",fontSize:10,fontFamily:FS,outline:"none",width:80}}/><button onClick={commit} style={{background:"#2B8A3E",color:"#fff",border:"none",borderRadius:3,padding:"1px 5px",fontSize:9,fontWeight:700,cursor:"pointer"}}>+</button></div>;
  return <div style={{display:"flex",gap:1,alignItems:"center"}}><Dd value={value} options={options} onChange={onChange} placeholder={placeholder} style={s}/><button onClick={()=>setAdding(true)} style={{background:"transparent",border:"1px solid #e2e0db",borderRadius:3,padding:"1px 4px",fontSize:10,cursor:"pointer",color:"#2B8A3E",fontWeight:700}} title="Add new person">+</button></div>;
}

// ─── Smart Add Task ───
function AddTask({onAdd,onAddPerson,categories,projects,levers,allOwners,realms,currentRealm,compact}){
  const[text,setText]=useState("");const[showOpts,setShowOpts]=useState(false);
  const[cat,setCat]=useState("Go Do");const[project,setProject]=useState("");const[owner,setOwner]=useState("");const[focusToday,setFocusToday]=useState(false);
  const ref=useRef(null);const openProjects=alphaSortProjects(projects.filter(p=>!p.closed));const sortedOwners=alphaSort(allOwners);

  const submit=()=>{
    if(!text.trim())return;
    const proj=openProjects.find(p=>p.name===project);
    onAdd({text:text.trim(),category:cat,project,lever:proj?.lever||"",owner,focusToday,realm:currentRealm});
    setText("");setCat("Go Do");setProject("");setOwner("");setFocusToday(false);setShowOpts(false);ref.current?.focus();
  };

  return <div style={{marginBottom:compact?8:12,background:"#fff",borderRadius:8,border:"1px solid #e2e0db",overflow:"hidden"}}>
    <div style={{display:"flex",gap:6,padding:compact?"6px 8px":"8px 10px"}}>
      <input ref={ref} value={text} onChange={e=>{setText(e.target.value);if(e.target.value&&!showOpts)setShowOpts(true);}} onKeyDown={e=>{if(e.key==="Enter")submit();}} placeholder="Add a task..." style={{flex:1,border:"none",fontSize:compact?12:13,fontFamily:FF,outline:"none",background:"transparent"}}/>
      <button onClick={()=>setShowOpts(!showOpts)} style={{background:"transparent",border:"none",cursor:"pointer",padding:2,opacity:0.4}}><Ic name={showOpts?"chevDown":"chevRight"} size={12} color="#999"/></button>
      <button onClick={submit} style={{background:"#2c2a25",color:"#fff",border:"none",borderRadius:6,padding:compact?"4px 10px":"6px 14px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:FS}}>Add</button>
    </div>
    {showOpts&&<div style={{display:"flex",flexWrap:"wrap",gap:4,padding:"4px 8px 8px",borderTop:"1px solid #f0eee9",alignItems:"center"}}>
      {categories.map(c=><button key={c} onClick={()=>setCat(c)} style={{background:cat===c?"#2c2a25":"#f5f3ee",color:cat===c?"#fff":"#2c2a25",border:"1px solid #e2e0db",borderRadius:5,padding:"2px 8px",fontSize:9,fontWeight:600,cursor:"pointer",fontFamily:FS}}>{c}</button>)}
      <span style={{color:"#ddd"}}>|</span>
      <Dd value={project} options={openProjects.map(p=>p.name)} onChange={setProject} placeholder="Project"/>
      <PersonPicker value={owner} options={sortedOwners} onChange={setOwner} onAddNew={onAddPerson} placeholder="Person"/>
      <label style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color:"#666",cursor:"pointer",fontFamily:FS}}><input type="checkbox" checked={focusToday} onChange={e=>setFocusToday(e.target.checked)} style={{width:12,height:12}}/> Today</label>
    </div>}
  </div>;
}

// ─── Task Row ───
function TaskRow({task,projects,levers,categories,realms,allOwners,onUpdate,onDelete,onAddPerson,onDragStart,onDragOver,onDrop,dragOverId,compact}){
  const[expanded,setExpanded]=useState(false);const[editing,setEditing]=useState(false);const[editText,setEditText]=useState(task.text);const[editNotes,setEditNotes]=useState(task.notes||"");
  const isDone=task.status==="Done";const isCancelled=task.status==="Cancelled";const dimmed=isDone||isCancelled;
  const projObj=projects.find(p=>p.name===task.project);const leverObj=levers.find(l=>l.name===task.lever);
  const isDropTarget=dragOverId===task.id;const openProjects=alphaSortProjects(projects.filter(p=>!p.closed));const sortedOwners=alphaSort(allOwners);
  const handleProjectChange=v=>{const proj=projects.find(p=>p.name===v);const u={project:v};if(proj&&proj.lever)u.lever=proj.lever;onUpdate(u);};
  const isFollowUp=task.category==="Follow Up";const isCallList=task.category==="Call List";
  const ownerTag=(isFollowUp)&&task.owner&&task.owner!=="Me";const pc=ownerTag?pColor(task.owner):"#1971C2";
  const py=compact?3:5;

  return <div onDragOver={e=>{e.preventDefault();onDragOver?.(task.id);}} onDrop={e=>{e.preventDefault();onDrop?.(task.id);}}
    style={{background:dimmed?"#fafaf8":"#fff",borderRadius:compact?5:7,border:`1px solid ${isDropTarget?"#1971C2":"#e8e6e1"}`,opacity:dimmed?0.4:1,transition:"all 0.15s"}}>
    <div style={{display:"flex",alignItems:"center",gap:compact?3:5,padding:`${py}px ${compact?6:8}px`}}>
      <div draggable onDragStart={e=>{e.dataTransfer.effectAllowed="move";onDragStart?.(task.id);}} style={{cursor:"grab",flexShrink:0,opacity:0.2}}><Ic name="grip" size={compact?10:12} color="#999"/></div>
      <div onClick={()=>onUpdate({status:isDone?"Open":"Done"})} style={{width:compact?15:17,height:compact?15:17,borderRadius:3,flexShrink:0,cursor:"pointer",border:isDone?"none":"1.5px solid #ccc",background:isDone?"#2B8A3E":"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{isDone&&<Ic name="check" size={compact?8:9} color="#fff"/>}</div>
      <div style={{flex:1,minWidth:0}}>
        {editing?<input value={editText} onChange={e=>setEditText(e.target.value)} onBlur={()=>{onUpdate({text:editText});setEditing(false);}} onKeyDown={e=>{if(e.key==="Enter"){onUpdate({text:editText});setEditing(false);}}} autoFocus style={{width:"100%",border:"1px solid #d4d0c8",borderRadius:3,padding:"1px 5px",fontSize:compact?11:12,fontFamily:FF,outline:"none"}}/>
        :<div onClick={()=>setEditing(true)} style={{fontSize:compact?11:12,fontFamily:FF,fontWeight:500,lineHeight:1.3,color:dimmed?"#999":"#2c2a25",textDecoration:(isDone||isCancelled)?"line-through":"none",cursor:"text",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:expanded?"normal":"nowrap"}}>
          {ownerTag&&<span style={{color:pc,fontWeight:700,fontFamily:FS,fontSize:compact?9:10,marginRight:3}}>{task.owner}:</span>}
          {task.text}
        </div>}
      </div>
      <div style={{display:"flex",gap:2,flexShrink:0,alignItems:"center"}}>
        {projObj&&!isCallList&&<Tag label={projObj.name} color={leverObj?.color||"#495057"} small/>}
        {task.owner&&!isFollowUp&&!isCallList&&task.owner!=="Me"&&<Tag label={task.owner} color={pColor(task.owner)} small/>}
        {task.dueDate&&<Tag label={task.dueDate} color="#9C36B5" small/>}
        {isCallList&&<Ic name="phone" size={compact?9:10} color="#2B8A3E"/>}
        {task.recurrence&&task.recurrence!=="none"&&<Tag label={task.recurrence} color="#0B7285" small/>}
        {task.notes&&<span style={{fontSize:8,color:"#b5b0a8"}}>📝</span>}
      </div>
      <div onClick={()=>onUpdate({focusToday:!task.focusToday})} style={{cursor:"pointer",flexShrink:0}}><Ic name="star" size={compact?11:13} color={task.focusToday?"#F59F00":"#d4d0c8"} fill={task.focusToday?"#F59F00":"none"}/></div>
      <div onClick={()=>onUpdate({longTerm:!task.longTerm})} style={{cursor:"pointer",flexShrink:0,opacity:task.longTerm?1:0.2}}><Ic name="clock" size={compact?10:12} color={task.longTerm?"#862E9C":"#999"}/></div>
      <div onClick={()=>setExpanded(!expanded)} style={{cursor:"pointer",flexShrink:0,transition:"transform 0.15s",transform:expanded?"rotate(90deg)":"rotate(0deg)"}}><Ic name="chevRight" size={compact?10:12} color="#999"/></div>
      <div onClick={onDelete} style={{cursor:"pointer",flexShrink:0,opacity:0.2}}><Ic name="trash" size={compact?10:11} color="#E8590C"/></div>
    </div>
    {expanded&&<div style={{padding:`3px 8px 6px ${compact?30:36}px`,borderTop:"1px solid #f0eee9"}}>
      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:3}}>
        <Dd value={task.category} options={categories} onChange={v=>onUpdate({category:v})} placeholder="Category"/>
        <Dd value={task.realm} options={realms} onChange={v=>onUpdate({realm:v})} placeholder="Realm"/>
        {!isCallList&&<Dd value={task.project} options={openProjects.map(p=>p.name)} onChange={handleProjectChange} placeholder="Project"/>}
        {!isCallList&&<Dd value={task.lever} options={levers.map(l=>l.name)} onChange={v=>onUpdate({lever:v})} placeholder="Lever"/>}
        <PersonPicker value={task.owner} options={sortedOwners} onChange={v=>onUpdate({owner:v})} onAddNew={onAddPerson} placeholder="Person"/>
        <Dd value={task.status} options={DEFAULT_STATUSES} onChange={v=>onUpdate({status:v})}/>
        <Dd value={task.recurrence||"none"} options={RECURRENCE} onChange={v=>onUpdate({recurrence:v})} placeholder="Repeat"/>
        <input type="date" value={task.dueDate||""} onChange={e=>onUpdate({dueDate:e.target.value})} style={{border:"1px solid #e2e0db",borderRadius:5,padding:"2px 4px",fontSize:10,fontFamily:FS,background:"#fff",color:"#2c2a25",cursor:"pointer"}}/>
      </div>
      <textarea value={editNotes} onChange={e=>setEditNotes(e.target.value)} onBlur={()=>onUpdate({notes:editNotes})} placeholder="Notes..." rows={2} style={{width:"100%",border:"1px solid #e2e0db",borderRadius:4,padding:"3px 5px",fontSize:10,fontFamily:FS,outline:"none",resize:"vertical",background:"#faf9f6",color:"#555"}}/>
    </div>}
  </div>;
}

// ─── Undo Toast ───
function UndoToast({task,onUndo,onDismiss}){
  useEffect(()=>{const t=setTimeout(onDismiss,6000);return()=>clearTimeout(t);},[]);
  return <div style={{position:"fixed",bottom:16,left:"50%",transform:"translateX(-50%)",background:"#2c2a25",color:"#fff",padding:"10px 18px",borderRadius:10,boxShadow:"0 4px 20px rgba(0,0,0,0.25)",display:"flex",alignItems:"center",gap:10,zIndex:2000,fontFamily:FS,fontSize:12}}>
    <span>Deleted: <b style={{fontFamily:FF}}>{task.text.slice(0,30)}{task.text.length>30?"...":""}</b></span>
    <button onClick={onUndo} style={{background:"#F59F00",color:"#2c2a25",border:"none",borderRadius:5,padding:"4px 12px",fontSize:11,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}><Ic name="undo" size={12} color="#2c2a25"/>Undo</button>
    <button onClick={onDismiss} style={{background:"transparent",border:"none",color:"#999",cursor:"pointer",fontSize:14}}>✕</button>
  </div>;
}

// ─── Staged Task Row (proper component to avoid hooks-in-map) ───
function StagedRow({task,index,isLive,isSkipped,categories,projects,levers,allOwners,realms,onUpdate,onRemove,onGoLive,onSkip}){
  const[et,setEt]=useState(false);const[tv,setTv]=useState(task.text);
  const isDone=isLive||isSkipped;const openProjects=projects;
  const commit=()=>{onUpdate({text:tv});setEt(false);};
  return <div style={{border:`1px solid ${task._dupe&&!isDone?"#F59F00":"#e8e6e1"}`,borderRadius:7,padding:"8px 10px",background:isLive?"#f0fdf4":isSkipped?"#f8f8f6":task._dupe?"#FFFBF0":"#FFFDF7",opacity:isDone?0.45:1}}>
    {task._dupe&&!isDone&&<div style={{fontSize:9,fontWeight:700,color:"#E8590C",marginBottom:4,fontFamily:FS}}>⚠️ POSSIBLE DUPLICATE — already in your task list</div>}
    <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:isDone?0:5}}>
      <button onClick={onGoLive} disabled={isDone} style={{background:isLive?"#86efac":"#2B8A3E",color:isLive?"#166534":"#fff",border:"none",borderRadius:5,padding:"2px 8px",fontSize:10,fontWeight:700,cursor:isDone?"default":"pointer",display:"flex",alignItems:"center",gap:2,flexShrink:0}}>{isLive?<><Ic name="check" size={9} color="#166534"/> Added</>:<><Ic name="zap" size={9} color="#fff"/> Go Live</>}</button>
      {task._dupe&&!isDone&&<button onClick={onSkip} style={{background:"#F59F00",color:"#fff",border:"none",borderRadius:5,padding:"2px 8px",fontSize:10,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:2,flexShrink:0}}>Skip Dupe</button>}
      {isSkipped&&<span style={{fontSize:10,color:"#999",fontFamily:FS}}>Skipped</span>}
      {et?<input value={tv} onChange={e=>setTv(e.target.value)} onBlur={commit} onKeyDown={e=>{if(e.key==="Enter")commit();}} autoFocus style={{flex:1,fontSize:12,fontFamily:FF,border:"1px solid #d4d0c8",borderRadius:4,padding:"2px 5px",outline:"none"}}/>
      :<div onClick={()=>{if(!isDone)setEt(true);}} style={{flex:1,fontSize:12,fontFamily:FF,fontWeight:500,color:isDone?"#999":"#2c2a25",cursor:isDone?"default":"text",display:"flex",alignItems:"center",gap:4,textDecoration:isDone?"line-through":"none"}}>{task.text}{!isDone&&<Ic name="edit" size={10} color="#b5b0a8"/>}</div>}
      <div onClick={onRemove} style={{cursor:"pointer",opacity:0.3}}><Ic name="trash" size={12} color="#E8590C"/></div>
    </div>
    {!isDone&&<div style={{display:"flex",flexWrap:"wrap",gap:3}}>
      <Dd value={task.category} options={categories} onChange={v=>onUpdate({category:v})} placeholder="Category"/>
      <Dd value={task.realm} options={realms} onChange={v=>onUpdate({realm:v})} placeholder="Realm"/>
      <Dd value={task.project} options={openProjects.map(p=>p.name)} onChange={v=>{const proj=openProjects.find(p=>p.name===v);onUpdate({project:v,lever:proj?.lever||task.lever});}} placeholder="Project"/>
      <Dd value={task.owner} options={alphaSort(allOwners)} onChange={v=>onUpdate({owner:v})} placeholder="Person"/>
      <label style={{display:"flex",alignItems:"center",gap:3,fontSize:10,color:"#666",cursor:"pointer"}}><input type="checkbox" checked={task.focusToday} onChange={e=>onUpdate({focusToday:e.target.checked})}/> Today</label>
    </div>}
  </div>;
}

// ─── Import Modal ───
function ImportModal({mode,onImportOne,onClose,categories,projects,levers,allOwners,realms,existingTasks}){
  const[input,setInput]=useState("");const[error,setError]=useState(null);
  const[staged,setStaged]=useState(null);const[liveIds,setLiveIds]=useState(new Set());const[skippedIds,setSkippedIds]=useState(new Set());
  const openProjects=alphaSortProjects(projects.filter(p=>!p.closed));
  const normalize=s=>(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
  const existingNorms=(existingTasks||[]).map(t=>normalize(t.text));
  const isDupe=text=>{const n=normalize(text);if(!n)return false;return existingNorms.some(e=>e===n||(n.length>8&&e.includes(n))||(e.length>8&&n.includes(e)));};
  const toStage=()=>{try{const arr=JSON.parse(input);if(!Array.isArray(arr))throw 0;setStaged(arr.map((t,i)=>{const proj=openProjects.find(p=>p.name===t.project);return{_i:i,text:t.text||"",category:t.category||"Go Do",project:t.project||"",lever:proj?.lever||"",owner:t.owner||"",status:t.status||"Open",dueDate:t.dueDate||"",focusToday:t.focusToday||false,longTerm:false,notes:"",realm:t.realm||"Work",recurrence:t.recurrence||"none",_dupe:isDupe(t.text||"")};}));setLiveIds(new Set());setSkippedIds(new Set());setError(null);}catch{setError("Invalid JSON.");}};
  const upS=(i,u)=>setStaged(p=>p.map((t,j)=>j===i?{...t,...u}:t));const rmS=i=>setStaged(p=>p.filter((_,j)=>j!==i));
  const skipOne=i=>setSkippedIds(p=>new Set(p).add(i));
  const goOne=i=>{if(liveIds.has(i)||skippedIds.has(i))return;const{_i,_dupe,...t}=staged[i];onImportOne(t);setLiveIds(p=>new Set(p).add(i));};
  const goRest=()=>{staged.filter((_,i)=>!liveIds.has(i)&&!skippedIds.has(i)&&!_._dupe).forEach(({_i,_dupe,...t})=>onImportOne(t));onClose();};
  const dupeCount=staged?staged.filter(t=>t._dupe).length:0;
  const rem=staged?staged.filter((t,i)=>!liveIds.has(i)&&!skippedIds.has(i)&&!t._dupe).length:0;
  const dupeRem=staged?staged.filter((t,i)=>t._dupe&&!liveIds.has(i)&&!skippedIds.has(i)).length:0;
  const allDone=staged&&rem===0&&dupeRem===0;

  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:20,overflowY:"auto"}}>
    <div style={{background:"#fff",borderRadius:14,padding:22,width:"100%",maxWidth:600,margin:"0 16px 40px",boxShadow:"0 20px 60px rgba(0,0,0,0.15)",maxHeight:"90vh",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <h2 style={{fontFamily:FF,fontSize:17,margin:0,display:"flex",alignItems:"center",gap:6}}><Ic name="code" size={16} color="#2c2a25"/>Import JSON</h2>
        <button onClick={onClose} style={{background:"#f5f3ee",border:"1px solid #e2e0db",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:600,cursor:"pointer",color:"#2c2a25",fontFamily:FS}}>✕ Close</button>
      </div>
      {staged?<div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}><div style={{fontSize:12,fontWeight:700,fontFamily:FS}}>📋 {liveIds.size} added · {skippedIds.size} skipped · {rem} remaining{dupeCount>0&&<span style={{color:"#E8590C",marginLeft:6}}>⚠️ {dupeCount} possible dupe{dupeCount>1?"s":""}</span>}</div><button onClick={()=>setStaged(null)} style={{background:"#f5f3ee",color:"#2c2a25",border:"1px solid #e2e0db",borderRadius:5,padding:"3px 8px",fontSize:10,fontWeight:600,cursor:"pointer"}}>← Back</button></div>
        <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:14}}>{staged.map((t,i)=><StagedRow key={i} task={t} index={i} isLive={liveIds.has(i)} isSkipped={skippedIds.has(i)} categories={categories} projects={openProjects} levers={levers} allOwners={allOwners} realms={realms} onUpdate={u=>upS(i,u)} onRemove={()=>rmS(i)} onGoLive={()=>goOne(i)} onSkip={()=>skipOne(i)}/>)}</div>
        {allDone?<button onClick={onClose} style={{width:"100%",background:"#2c2a25",color:"#fff",border:"none",borderRadius:8,padding:"9px",fontSize:12,fontWeight:700,cursor:"pointer"}}>✅ Done — Close</button>
        :rem>0?<button onClick={goRest} style={{width:"100%",background:"#2B8A3E",color:"#fff",border:"none",borderRadius:8,padding:"9px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><Ic name="rocket" size={14} color="#fff"/>Go Live — {rem} New{dupeRem>0?` (${dupeRem} dupe${dupeRem>1?"s":""} need review)`:""}</button>
        :dupeRem>0?<div style={{textAlign:"center",fontSize:11,color:"#999",padding:"8px 0"}}>Only duplicates remaining — Go Live or Skip each one above, or <button onClick={onClose} style={{background:"transparent",border:"none",color:"#1971C2",fontWeight:600,cursor:"pointer",fontSize:11,textDecoration:"underline"}}>close</button></div>
        :null}
      </div>:<>
        <textarea value={input} onChange={e=>setInput(e.target.value)} rows={8} placeholder={'Paste JSON array, e.g.:\n[\n  {"text":"My task","category":"Go Do"},\n  {"text":"Call Jim","category":"Call List","owner":"Jim"}\n]'} style={{width:"100%",border:"1px solid #e2e0db",borderRadius:7,padding:8,fontSize:11,fontFamily:"monospace",outline:"none",resize:"vertical"}}/>
        {error&&<div style={{marginTop:5,padding:"5px 8px",background:"#FFF4E6",border:"1px solid #F59F00",borderRadius:5,color:"#E8590C",fontSize:11}}>{error}</div>}
        {input.trim()&&<button onClick={toStage} style={{marginTop:6,background:"#1971C2",color:"#fff",border:"none",borderRadius:7,padding:"7px",fontSize:12,fontWeight:700,cursor:"pointer",width:"100%"}}>📋 Review Before Import</button>}
      </>}
    </div>
  </div>;
}

// ─── Settings ───
function Settings({leversIn,projectsIn,categoriesIn,realmsIn,ownersIn,onSave,onClose}){
  const[levers,setLevers]=useState(leversIn);const[projects,setProjects]=useState(projectsIn);const[categories,setCategories]=useState(categoriesIn);const[realms,setRealms]=useState(realmsIn);const[owners,setOwners]=useState(ownersIn);
  const handleClose=()=>{onSave({levers,projects,categories,realms,owners});onClose();};
  const updateProjectLever=(i,v)=>{const u=[...projects];u[i]={...u[i],lever:v};setProjects(u);};
  const[di,setDi]=useState(null);const[oi,setOi]=useState(null);
  const[exportSql,setExportSql]=useState("");
  const generateExport=async()=>{
    const keys=["gd-tasks","gd-projects","gd-levers","gd-categories","gd-realms","gd-owners"];
    const lines=[];
    for(const key of keys){try{const val=await ld(key,null);if(val!==null){const raw=JSON.stringify(val);const escaped=raw.replace(/'/g,"''");lines.push(`  ('${key}', '${escaped}')`);};}catch{}}
    if(lines.length===0){setExportSql("-- No data found");return;}
    setExportSql("INSERT INTO kv_store (key, value) VALUES\n"+lines.join(",\n")+"\nON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();");
  };
  const dropP=to=>{if(di===null||di===to)return;const a=[...projects];const[item]=a.splice(di,1);a.splice(to,0,item);setProjects(a);setDi(null);setOi(null);};

  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:1000,display:"flex",justifyContent:"center",alignItems:"flex-start",paddingTop:20,overflowY:"auto"}}>
    <div style={{background:"#fff",borderRadius:14,padding:22,width:"100%",maxWidth:520,margin:"0 16px 40px",boxShadow:"0 20px 60px rgba(0,0,0,0.15)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h2 style={{fontFamily:FF,fontSize:17,margin:0}}>Settings</h2>
        <button onClick={handleClose} style={{background:"#f5f3ee",border:"1px solid #e2e0db",borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:FS}}>✕ Close</button>
      </div>
      <SettingsSection title="FY26 Levers"><div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:5}}>{levers.map((l,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:11,height:11,borderRadius:3,background:l.color,flexShrink:0}}/><span style={{flex:1,fontSize:12}}>{l.name}</span><span onClick={()=>setLevers(levers.filter((_,j)=>j!==i))} style={{cursor:"pointer",opacity:0.3,fontSize:14}}>×</span></div>)}</div><LeverAdder onAdd={(n,c)=>setLevers([...levers,{name:n,color:c}])}/></SettingsSection>
      <SettingsSection title="Projects (drag to reorder)"><div style={{display:"flex",flexDirection:"column",gap:3,marginBottom:5}} onDragEnd={()=>{setDi(null);setOi(null);}}>
        {projects.map((p,i)=><div key={i} draggable onDragStart={()=>setDi(i)} onDragOver={e=>{e.preventDefault();setOi(i);}} onDrop={e=>{e.preventDefault();dropP(i);}}
          style={{display:"flex",alignItems:"center",gap:5,opacity:p.closed?0.4:1,padding:"3px 4px",borderRadius:4,background:oi===i?"#e8f4fd":"transparent",borderLeft:oi===i?"2px solid #1971C2":"2px solid transparent"}}>
          <div style={{cursor:"grab",opacity:0.3}}><Ic name="grip" size={11} color="#999"/></div>
          <span style={{flex:1,fontSize:12,textDecoration:p.closed?"line-through":"none",fontFamily:FS}}>{p.name}</span>
          <Dd value={p.lever} options={levers.map(l=>l.name)} onChange={v=>updateProjectLever(i,v)} placeholder="Lever" style={{fontSize:9,padding:"1px 3px",maxWidth:120}}/>
          <span onClick={()=>{const u=[...projects];u[i]={...u[i],closed:!u[i].closed};setProjects(u);}} style={{cursor:"pointer",fontSize:9,color:p.closed?"#2B8A3E":"#999",fontWeight:600}}>{p.closed?"Open":"Close"}</span>
          <span onClick={()=>setProjects(projects.filter((_,j)=>j!==i))} style={{cursor:"pointer",opacity:0.3,fontSize:13}}>×</span>
        </div>)}
      </div><ProjectAdder levers={levers} onAdd={(n,l)=>setProjects([...projects,{name:n,lever:l,closed:false}])}/></SettingsSection>
      <SettingsSection title="Categories"><div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:5}}>{categories.map((c,i)=><Tag key={i} label={c} color="#1971C2" onRemove={()=>setCategories(categories.filter((_,j)=>j!==i))}/>)}</div><InlineAdder placeholder="New category..." onAdd={v=>setCategories([...categories,v])}/></SettingsSection>
      <SettingsSection title="Realms (Work / Home)"><div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:5}}>{realms.map((r,i)=><Tag key={i} label={r} color="#0B7285" onRemove={()=>setRealms(realms.filter((_,j)=>j!==i))}/>)}</div><InlineAdder placeholder="New realm..." onAdd={v=>setRealms([...realms,v])}/></SettingsSection>
      <SettingsSection title="People"><div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:5}}>{alphaSort(owners).map((o,i)=><Tag key={o} label={o} color={pColor(o)} onRemove={()=>setOwners(owners.filter(x=>x!==o))}/>)}</div><InlineAdder placeholder="Add person..." onAdd={v=>setOwners([...owners,v])}/></SettingsSection>
      <SettingsSection title="Export to Supabase / Vercel">
        <button onClick={generateExport} style={{background:"#1971C2",color:"#fff",border:"none",borderRadius:6,padding:"7px 14px",fontSize:11,fontWeight:700,cursor:"pointer",width:"100%",marginBottom:6}}>📤 Generate SQL for Supabase</button>
        {exportSql&&<><button onClick={()=>navigator.clipboard.writeText(exportSql)} style={{background:"#2B8A3E",color:"#fff",border:"none",borderRadius:6,padding:"6px 14px",fontSize:11,fontWeight:700,cursor:"pointer",width:"100%",marginBottom:6}}>📋 Copy SQL to Clipboard</button><textarea value={exportSql} readOnly rows={6} style={{width:"100%",border:"1px solid #e2e0db",borderRadius:6,padding:8,fontSize:10,fontFamily:"monospace",outline:"none",resize:"vertical",background:"#faf9f6"}}/></>}
      </SettingsSection>
      <button onClick={handleClose} style={{width:"100%",background:"#2c2a25",color:"#fff",border:"none",borderRadius:7,padding:"9px",fontSize:12,fontWeight:700,cursor:"pointer",marginTop:4}}>Save & Close</button>
    </div>
  </div>;
}

// ═══════════════════════════════════════════
export default function GoDoApp(){
  const[tasks,setTasks]=useState([]);const[projects,setProjects]=useState([]);const[levers,setLevers]=useState([]);const[categories,setCategories]=useState(DEFAULT_CATEGORIES);const[realms,setRealms]=useState(DEFAULT_REALMS);const[owners,setOwners]=useState([]);
  const[view,setView]=useState("work");const[showSettings,setShowSettings]=useState(false);const[importMode,setImportMode]=useState(null);const[loaded,setLoaded]=useState(false);const[fStatus,setFStatus]=useState("active");const[search,setSearch]=useState("");
  const[dragId,setDragId]=useState(null);const[dragOverId,setDragOverId]=useState(null);const[expandedFollowUps,setExpandedFollowUps]=useState({});const[compact,setCompact]=useState(true);
  const[undoTask,setUndoTask]=useState(null);const[projDragIdx,setProjDragIdx]=useState(null);const[projOverIdx,setProjOverIdx]=useState(null);

  useEffect(()=>{(async()=>{const[t,p,l,c,r,o]=await Promise.all([ldM(SK.tasks,OLD_SK.tasks,[]),ldM(SK.projects,OLD_SK.projects,[]),ldM(SK.levers,OLD_SK.levers,DEFAULT_LEVERS),ldM(SK.categories,OLD_SK.categories,DEFAULT_CATEGORIES),ld(SK.realms,DEFAULT_REALMS),ldM(SK.owners,OLD_SK.owners,[])]);setTasks(t);setProjects(p);setLevers(l);setCategories(c);setRealms(r);setOwners(o);setLoaded(true);})();},[]);
  useEffect(()=>{if(loaded)sv(SK.tasks,tasks);},[tasks,loaded]);useEffect(()=>{if(loaded)sv(SK.projects,projects);},[projects,loaded]);useEffect(()=>{if(loaded)sv(SK.levers,levers);},[levers,loaded]);useEffect(()=>{if(loaded)sv(SK.categories,categories);},[categories,loaded]);useEffect(()=>{if(loaded)sv(SK.realms,realms);},[realms,loaded]);useEffect(()=>{if(loaded)sv(SK.owners,owners);},[owners,loaded]);

  const addPerson=name=>{if(!owners.includes(name))setOwners(prev=>[...prev,name]);};
  const addTaskObj=obj=>setTasks(prev=>[{id:uid(),text:obj.text,category:obj.category||"Go Do",project:obj.project||"",lever:obj.lever||"",owner:obj.owner||"",status:"Open",dueDate:obj.dueDate||"",focusToday:obj.focusToday||false,longTerm:false,notes:"",realm:obj.realm||"Work",recurrence:obj.recurrence||"none",createdAt:new Date().toISOString()},...prev]);
  const updateTask=(id,u)=>{
    setTasks(prev=>{
      const task=prev.find(t=>t.id===id);
      // If marking a recurring task Done, create next instance
      if(u.status==="Done"&&task&&task.recurrence&&task.recurrence!=="none"){
        const nextDate=calcNextDue(task.dueDate||new Date().toISOString().split("T")[0],task.recurrence);
        const newTask={id:uid(),text:task.text,category:task.category,project:task.project,lever:task.lever,owner:task.owner,status:"Open",dueDate:nextDate,focusToday:false,longTerm:task.longTerm,notes:task.notes,realm:task.realm,recurrence:task.recurrence,createdAt:new Date().toISOString()};
        return [newTask,...prev.map(t=>t.id===id?{...t,...u}:t)];
      }
      return prev.map(t=>t.id===id?{...t,...u}:t);
    });
  };
  const deleteTask=id=>{const t=tasks.find(x=>x.id===id);if(t)setUndoTask(t);setTasks(prev=>prev.filter(x=>x.id!==id));};
  const undoDelete=()=>{if(undoTask){setTasks(prev=>[undoTask,...prev]);setUndoTask(null);}};
  const importOneTask=t=>{const proj=projects.find(p=>p.name===t.project);setTasks(prev=>[{id:uid(),text:t.text||"",category:t.category||"Go Do",project:t.project||"",lever:proj?.lever||t.lever||"",owner:t.owner||"",status:t.status||"Open",dueDate:t.dueDate||"",focusToday:t.focusToday||false,longTerm:false,notes:t.notes||"",realm:t.realm||"Work",recurrence:t.recurrence||"none",createdAt:new Date().toISOString()},...prev]);};

  const handleDrop=dropId=>{if(!dragId||dragId===dropId)return;setTasks(prev=>{const arr=[...prev];const f=arr.findIndex(t=>t.id===dragId);const to=arr.findIndex(t=>t.id===dropId);const[item]=arr.splice(f,1);arr.splice(to,0,item);return arr;});setDragId(null);setDragOverId(null);};
  const handleProjDrop=toIdx=>{if(projDragIdx===null||projDragIdx===toIdx)return;setProjects(prev=>{const a=[...prev];const[item]=a.splice(projDragIdx,1);a.splice(toIdx,0,item);return a;});setProjDragIdx(null);setProjOverIdx(null);};
  const handleSaveSettings=({levers:l,projects:p,categories:c,realms:r,owners:o})=>{p.forEach(proj=>{const old=projects.find(op=>op.name===proj.name);if(proj.lever&&(!old||old.lever!==proj.lever))setTasks(prev=>prev.map(t=>t.project===proj.name?{...t,lever:proj.lever}:t));});setLevers(l);setProjects(p);setCategories(c);setRealms(r);setOwners(o);};

  const allOwners=["Me",...owners];const today=new Date().toISOString().split("T")[0];
  const filtered=tasks.filter(t=>{if(fStatus==="active"&&(t.status==="Done"||t.status==="Cancelled"))return false;if(fStatus==="done"&&t.status!=="Done")return false;if(fStatus==="cancelled"&&t.status!=="Cancelled")return false;if(search&&!t.text.toLowerCase().includes(search.toLowerCase())&&!(t.owner||"").toLowerCase().includes(search.toLowerCase()))return false;return true;});
  const todayTasks=filtered.filter(t=>t.focusToday||t.dueDate===today);
  const sortTasks=list=>[...list].sort((a,b)=>(a.longTerm===b.longTerm?0:a.longTerm?1:-1));
  const currentRealm=view==="home"?"Home":"Work";

  const views=[{id:"today",label:"Today",icon:"sun"},{id:"work",label:"Work",icon:"briefcase"},{id:"home",label:"Home",icon:"home"},{id:"project",label:"Projects",icon:"list"},{id:"lever",label:"Levers",icon:"layers"},{id:"owner",label:"People",icon:"user"}];
  const trp=t=>({key:t.id,task:t,projects,levers,categories,realms,allOwners,compact,onUpdate:u=>updateTask(t.id,u),onDelete:()=>deleteTask(t.id),onAddPerson:addPerson,onDragStart:setDragId,onDragOver:setDragOverId,onDrop:handleDrop,dragOverId});
  const renderTasks=list=>{const sorted=sortTasks(list);return <div style={{display:"flex",flexDirection:"column",gap:compact?2:3}} onDragEnd={()=>{setDragId(null);setDragOverId(null);}}>{sorted.length===0&&<div style={{padding:"5px 0",color:"#b5b0a8",fontSize:10,fontStyle:"italic"}}>No tasks</div>}{sorted.map(t=><TaskRow {...trp(t)}/>)}</div>;};

  const renderRealmView=realm=>{
    const rf=filtered.filter(t=>(t.realm||"Work")===realm);
    if(fStatus==="cancelled"){if(rf.length===0)return <div style={{padding:"20px 0",textAlign:"center",color:"#b5b0a8",fontSize:11}}>No cancelled tasks.</div>;return <div><SH icon="archive" label="Cancelled" count={rf.length} color="#999"/>{renderTasks(rf)}</div>;}
    const co=["Go Do","Follow Up","Call List","Deadline","Idea",...categories.filter(c=>!["Go Do","Follow Up","Call List","Deadline","Idea"].includes(c))];
    return co.map(cat=>{
      const ct=rf.filter(t=>t.category===cat);if(ct.length===0)return null;
      const oc=ct.filter(t=>!["Done","Cancelled"].includes(t.status)).length;
      if(cat==="Follow Up"){
        const byP={};ct.forEach(t=>{const p=t.owner||"Unassigned";if(!byP[p])byP[p]=[];byP[p].push(t);});
        return <div key={cat}><SH icon="user" label="Follow Ups" count={oc} color="#1971C2"/>
          <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:5}}>{Object.keys(byP).sort().map(person=>{const pc=pColor(person);return <button key={person} onClick={()=>setExpandedFollowUps(p=>({...p,[person]:!p[person]}))} style={{background:expandedFollowUps[person]?pc:"#fff",color:expandedFollowUps[person]?"#fff":pc,border:`1px solid ${pc}`,borderRadius:5,padding:"2px 8px",fontSize:10,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:2}}>{person}<span style={{fontSize:8,opacity:0.7}}>({byP[person].length})</span><Ic name={expandedFollowUps[person]?"chevDown":"chevRight"} size={9} color={expandedFollowUps[person]?"#fff":pc}/></button>;})}</div>
          {Object.entries(byP).map(([person,pTasks])=>expandedFollowUps[person]&&<div key={person} style={{marginLeft:6,marginBottom:4}}>{renderTasks(pTasks)}</div>)}
        </div>;
      }
      if(cat==="Call List")return <div key={cat}><SH icon="phone" label="Call List" count={oc} color="#2B8A3E"/>{renderTasks(ct)}</div>;
      const im={"Go Do":"check","Deadline":"clock","Idea":"sun"};const cm={"Go Do":"#E8590C","Deadline":"#9C36B5","Idea":"#2B8A3E"};
      return <div key={cat}><SH icon={im[cat]||"filter"} label={cat} count={oc} color={cm[cat]||"#2c2a25"}/>{renderTasks(ct)}</div>;
    });
  };

  const renderTodayView=()=>{
    const home=todayTasks.filter(t=>(t.realm||"Work")==="Home");const work=todayTasks.filter(t=>(t.realm||"Work")==="Work");
    const other=realms.filter(r=>r!=="Work"&&r!=="Home").map(r=>({realm:r,tasks:todayTasks.filter(t=>t.realm===r)})).filter(x=>x.tasks.length>0);
    if(todayTasks.length===0)return <div style={{padding:"20px 0",textAlign:"center",color:"#b5b0a8"}}><div style={{fontSize:20,marginBottom:4}}>☀️</div><div style={{fontSize:11}}>Star tasks or set today's date.</div></div>;
    return <>{home.length>0&&<><SH icon="home" label="Home" count={home.length} color="#0B7285"/>{renderTasks(home)}</>}{other.map(x=><div key={x.realm}><SH icon="list" label={x.realm} count={x.tasks.length} color="#495057"/>{renderTasks(x.tasks)}</div>)}{work.length>0&&<><SH icon="briefcase" label="Work" count={work.length} color="#E8590C"/>{renderTasks(work)}</>}</>;
  };

  // Projects tab: flat list, draggable, lever shown small
  const renderProjectView=()=>{
    if(projects.length===0)return <div style={{padding:"20px 0",textAlign:"center",color:"#b5b0a8",fontSize:11}}>No projects. Add in Settings.</div>;
    return <div onDragEnd={()=>{setProjDragIdx(null);setProjOverIdx(null);}}>{projects.map((proj,pi)=>{
      const pt=filtered.filter(t=>t.project===proj.name);const oc=pt.filter(t=>!["Done","Cancelled"].includes(t.status)).length;const lo=levers.find(l=>l.name===proj.lever);
      return <div key={proj.name} style={{marginTop:8}}
        draggable onDragStart={()=>setProjDragIdx(pi)} onDragOver={e=>{e.preventDefault();setProjOverIdx(pi);}} onDrop={e=>{e.preventDefault();handleProjDrop(pi);}}>
        <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3,padding:"2px 4px",borderRadius:4,background:projOverIdx===pi?"#e8f4fd":"transparent",borderLeft:projOverIdx===pi?"2px solid #1971C2":"2px solid transparent"}}>
          <div style={{cursor:"grab",opacity:0.2}}><Ic name="grip" size={11} color="#999"/></div>
          <Ic name="briefcase" size={11} color={proj.closed?"#ccc":"#495057"}/>
          <span style={{fontSize:12,fontWeight:700,color:proj.closed?"#999":"#2c2a25",textDecoration:proj.closed?"line-through":"none",fontFamily:FS}}>{proj.name}</span>
          {proj.closed&&<Tag label="Closed" color="#999" small/>}
          <span style={{fontSize:10,color:"#9a9690"}}>{oc}</span>
          {proj.lever&&<span style={{fontSize:8,color:lo?.color||"#999",fontFamily:FS,opacity:0.5}}>{proj.lever}</span>}
        </div>
        {pt.length===0?<div style={{padding:"2px 0 2px 24px",color:"#b5b0a8",fontSize:10,fontStyle:"italic"}}>No tasks</div>:renderTasks(pt)}
      </div>;
    })}</div>;
  };

  const renderLeverView=()=>{
    if(levers.length===0)return <div style={{padding:"20px 0",textAlign:"center",color:"#b5b0a8",fontSize:11}}>No levers.</div>;
    return levers.map(lever=>{const lt=filtered.filter(t=>t.lever===lever.name);const oc=lt.filter(t=>!["Done","Cancelled"].includes(t.status)).length;
      return <div key={lever.name}><SH icon="layers" label={lever.name} count={oc} color={lever.color} empty={lt.length===0}/>{lt.length>0?renderTasks(lt):<div style={{padding:"2px 0",color:"#b5b0a8",fontSize:10,fontStyle:"italic"}}>No tasks</div>}</div>;});
  };

  // People tab: show ALL tasks with an owner (not just Follow Up)
  const renderPeopleView=()=>{
    const groups={};alphaSort(allOwners).forEach(o=>{groups[o]=[];});groups["Unassigned"]=[];
    filtered.forEach(t=>{const v=t.owner||"Unassigned";if(!groups[v])groups[v]=[];groups[v].push(t);});
    return Object.entries(groups).map(([label,items])=>{if(items.length===0)return null;const oc=items.filter(i=>!["Done","Cancelled"].includes(i.status)).length;
      return <div key={label}><SH icon="user" label={label} count={oc} color={pColor(label)}/>{renderTasks(items)}</div>;});
  };

  if(!loaded)return <div style={{minHeight:"100vh",background:"#f5f3ee",display:"flex",alignItems:"center",justifyContent:"center",color:"#9a9690",fontFamily:FS}}>Loading...</div>;

  const hb={cursor:"pointer",padding:"4px 7px",borderRadius:5,background:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:3,fontSize:10,color:"#E8D5B7",fontWeight:600,border:"none",fontFamily:FS};

  return <div style={{minHeight:"100vh",background:"#f5f3ee",fontFamily:FS}}>
    <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    <div style={{background:"#2c2a25",padding:"10px 18px",color:"#fff"}}>
      <div style={{maxWidth:820,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <h1 style={{fontFamily:FF,fontSize:17,fontWeight:600,margin:0,display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:17}}>✅</span> Go Do App</h1>
          <p style={{fontSize:9,color:"#a8a49c",margin:"1px 0 0 24px"}}>{tasks.filter(t=>ACTIVE_STATUSES.includes(t.status)).length} active · {tasks.filter(t=>t.status==="Done").length} done · {todayTasks.length} today</p>
        </div>
        <div style={{display:"flex",gap:3,alignItems:"center"}}>
          <button onClick={()=>setCompact(!compact)} style={hb}><Ic name={compact?"maximize":"minimize"} size={12} color="#E8D5B7"/></button>
          <button onClick={()=>setImportMode("json")} style={hb}><Ic name="code" size={12} color="#E8D5B7"/> Import</button>
          <button onClick={()=>setShowSettings(true)} style={{...hb,padding:"4px 5px"}}><Ic name="settings" size={14} color="#E8D5B7"/></button>
        </div>
      </div>
    </div>
    <div style={{background:"#eae7e0",borderBottom:"1px solid #ddd9d0"}}>
      <div style={{maxWidth:820,margin:"0 auto",display:"flex",overflowX:"auto",padding:"0 4px"}}>
        {views.map(v=><button key={v.id} onClick={()=>setView(v.id)} style={{background:view===v.id?"#f5f3ee":"transparent",border:"none",borderBottom:view===v.id?"2px solid #2c2a25":"2px solid transparent",padding:"6px 7px",cursor:"pointer",fontSize:10,fontWeight:view===v.id?700:500,color:view===v.id?"#2c2a25":"#8a857d",fontFamily:FS,display:"flex",alignItems:"center",gap:3,whiteSpace:"nowrap"}}><Ic name={v.icon} size={10} color={view===v.id?"#2c2a25":"#8a857d"}/>{v.label}</button>)}
      </div>
    </div>
    <div style={{maxWidth:820,margin:"0 auto",padding:"10px 12px 50px"}}>
      <div style={{display:"flex",gap:5,marginBottom:8,flexWrap:"wrap"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{flex:1,minWidth:100,border:"1px solid #e2e0db",borderRadius:5,padding:"5px 8px",fontSize:11,outline:"none",background:"#fff",fontFamily:FS}}/>
        <div style={{display:"flex",gap:2}}>{["active","all","done","cancelled"].map(s=><button key={s} onClick={()=>setFStatus(s)} style={{background:fStatus===s?"#2c2a25":"#fff",color:fStatus===s?"#fff":"#2c2a25",border:"1px solid #e2e0db",borderRadius:4,padding:"3px 7px",fontSize:9,fontWeight:600,cursor:"pointer",textTransform:"capitalize"}}>{s}</button>)}</div>
      </div>
      {(view==="work"||view==="home")&&<AddTask onAdd={addTaskObj} onAddPerson={addPerson} categories={categories} projects={projects} levers={levers} allOwners={allOwners} realms={realms} currentRealm={currentRealm} compact={compact}/>}
      {view==="today"&&renderTodayView()}
      {view==="work"&&renderRealmView("Work")}
      {view==="home"&&renderRealmView("Home")}
      {view==="project"&&renderProjectView()}
      {view==="lever"&&renderLeverView()}
      {view==="owner"&&renderPeopleView()}
    </div>
    {showSettings&&<Settings leversIn={levers} projectsIn={projects} categoriesIn={categories} realmsIn={realms} ownersIn={owners} onSave={handleSaveSettings} onClose={()=>setShowSettings(false)}/>}
    {importMode&&<ImportModal mode={importMode} onImportOne={importOneTask} onClose={()=>setImportMode(null)} categories={categories} projects={projects} levers={levers} allOwners={allOwners} realms={realms} existingTasks={tasks}/>}
    {undoTask&&<UndoToast task={undoTask} onUndo={undoDelete} onDismiss={()=>setUndoTask(null)}/>}
    <style>{`*{box-sizing:border-box;margin:0;}button:hover{opacity:0.9;}input::placeholder,textarea::placeholder{color:#b5b0a8;}::-webkit-scrollbar{height:3px;}::-webkit-scrollbar-thumb{background:#ccc;border-radius:3px;}`}</style>
  </div>;
}
