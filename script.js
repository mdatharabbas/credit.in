const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuToggle?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('contactForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const form=e.target;
  const note=document.getElementById('formNote');
  const btn=form.querySelector('button[type="submit"]');
  const data=new FormData(form);
  btn.disabled=true;
  note.style.color='#617083';
  note.textContent='Sending...';
  try{
    const res=await fetch('https://api.web3forms.com/submit',{
      method:'POST',
      headers:{'Accept':'application/json'},
      body:data
    });
    const result=await res.json();
    if(result.success){
      note.style.color='#00a7a0';
      note.textContent='Thank you — your enquiry has been sent. I will get back to you shortly.';
      form.reset();
    }else{
      note.style.color='#c0392b';
      note.textContent='Something went wrong sending your enquiry. Please try again or email directly.';
    }
  }catch(err){
    note.style.color='#c0392b';
    note.textContent='Could not send right now. Please check your connection and try again.';
  }finally{
    btn.disabled=false;
  }
});
