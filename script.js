(function(){
  var ICON="assets/icone-citare.webp";
  var app='<div class="app"><img src="'+ICON+'" alt="">citare</div>';
  var data=[
    {t:"Frases diárias",d:"Todo dia uma nova frase para te inspirar e te fazer pensar.",
     h:app+'<q>Disciplina é o que te leva onde a motivação não consegue.</q><small>Frase do dia</small>'},
    {t:"Contexto e significado",d:"Explore o contexto, o significado e as ideias por trás de cada reflexão.",
     h:app+'<p class="lbl">Contexto</p><div class="bar"></div><div class="bar" style="width:80%"></div><p class="lbl">Significado</p><div class="bar"></div><div class="bar" style="width:60%"></div><p class="lbl">Frase original</p><div class="bar" style="width:90%"></div>'},
    {t:"Favoritas",d:"Crie sua própria coleção de frases favoritas.",
     h:app+'<p class="lbl">Favoritas</p><div class="row">★ <div class="bar" style="flex:1"></div></div><div class="row">★ <div class="bar" style="flex:1;width:70%"></div></div><div class="row">★ <div class="bar" style="flex:1"></div></div>'},
    {t:"Compartilhar",d:"Espalhe boas ideias e inspire outras pessoas.",
     h:app+'<q>Disciplina é o que te leva onde a motivação não consegue.</q><div class="pill">Compartilhar</div>'}
  ];
  var tabs=document.querySelector(".tabs"),screen=document.getElementById("screen");
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function pick(i){
    var swap=function(){
      screen.innerHTML=data[i].h;
      [].forEach.call(tabs.children,function(b,j){b.setAttribute("aria-selected",j===i?"true":"false");b.tabIndex=j===i?0:-1});
      screen.classList.remove("fade");
    };
    if(reduce){swap();return}
    screen.classList.add("fade");
    setTimeout(swap,220);
  }
  data.forEach(function(x,i){
    var b=document.createElement("button");b.className="tab";b.setAttribute("role","tab");
    b.innerHTML="<b>"+x.t+"</b><span>"+x.d+"</span>";
    b.onclick=function(){pick(i)};
    b.onkeydown=function(e){
      var n=e.key==="ArrowDown"||e.key==="ArrowRight"?1:e.key==="ArrowUp"||e.key==="ArrowLeft"?-1:0;
      if(n){e.preventDefault();var k=(i+n+data.length)%data.length;pick(k);tabs.children[k].focus()}
    };
    tabs.appendChild(b);
  });
  pick(0);

  var els=document.querySelectorAll("[data-animate]");
  if("IntersectionObserver" in window && !reduce){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target)}});
    },{threshold:.18,rootMargin:"0px 0px -60px 0px"});
    els.forEach(function(el){io.observe(el)});
  } else {
    els.forEach(function(el){el.classList.add("in")});
  }

  if(reduce) return;

  var hero=document.querySelector(".hero");
  if(hero){
    hero.addEventListener("pointermove",function(e){
      var r=hero.getBoundingClientRect();
      hero.style.setProperty("--mx",(e.clientX-r.left)+"px");
      hero.style.setProperty("--my",(e.clientY-r.top)+"px");
    });
  }

  var pw=document.querySelector(".phone-wrap"),phone=document.querySelector(".phone");
  if(pw&&phone){
    pw.addEventListener("pointermove",function(e){
      var r=pw.getBoundingClientRect();
      var px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
      phone.style.transform="rotateY("+(px*16)+"deg) rotateX("+(py*-16)+"deg)";
    });
    pw.addEventListener("pointerleave",function(){phone.style.transform=""});
  }
})();