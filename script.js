const submitBtn=document.getElementById('submitBtn');
submitBtn.onclick=()=>{
document.querySelectorAll('.error').forEach(e=>e.style.display='none');
let nom=document.getElementById('nom');
if(!nom.value){
document.getElementById('err-nom').style.display='block';
nom.focus();
return;
}
alert('Formulaire valide');
};