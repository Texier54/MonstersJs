'use strict'

let monster = {
	
};
monster.modules = {};
monster.modules.actions = (function () {

	let name = "Monster";
	let life = "";
	let money = "";
	let awake = "";

	let showMe = function () {
		monster.modules.app.displayStatus(life, money, awake);
		monster.modules.app.log("me: name: "+name+" life: "+life+" money: "+money+" awake: "+awake);
	}
	let init = function(nom, vie, argent, dort){
		name = nom;
		life = vie;
		money = argent;
		awake = dort;
	}
	let run = function () {
		if(awake == 0)
		{
			if(life>=1)
			{
				life = life -1 ;
				monster.modules.app.log("Running");
				monster.modules.app.displayStatus(life, money, awake);
			}
			else
				monster.modules.app.log("Monster not enought life or dead");
		}
		else
			monster.modules.app.log("Monster is sleeping");
	}
	let fight = function () {
		if(awake == 0)
		{
			if(life>=3)
			{
				life = life - 3;
				monster.modules.app.log("Fighting");
				monster.modules.app.displayStatus(life, money, awake);
			}
			else
				monster.modules.app.log("Monster not enought life  or dead");
		}
		else
			monster.modules.app.log("Monster is sleeping");
	}
	let work = function () {
		if(awake == 0)
		{
			if(life>=1)
			{
				life = life - 1;
				money = money + 2;
				monster.modules.app.log("Working");
				monster.modules.app.displayStatus(life, money, awake);
			}
			else
				monster.modules.app.log("Monster not enought life  or dead");
		}
		else
			monster.modules.app.log("Monster is sleeping");
	}
	let eat = function () {
		if(awake == 0)
		{
			if(life>=1)
			{
				if(money>=3)
				{
					life = life + 2;
					money = money - 3;
					monster.modules.app.log("Eating");
					monster.modules.app.displayStatus(life, money, awake);
				}
				else
					monster.modules.app.log("Monster not enought money");
			}
			else
				monster.modules.app.log("Monster not enought life  or dead");
		}
		else
			monster.modules.app.log("Monster is sleeping");
	}
	let sleep = function () {
		if(awake == 0)
		{
			if(life<0)
			{
				awake=1;
				monster.modules.app.log("Sleeping");
				monster.modules.app.displayStatus(life, money, awake)
				setTimeout(function(){ awake=0; life = life + 1; monster.modules.app.log("Waking up"); monster.modules.app.displayStatus(life, money, awake);}, 10000);
			}
			else
				monster.modules.app.log("Monster not enought life  or dead");
		}
		else
			monster.modules.app.log("Monster is sleeping");
	}
	let random = function () {
		if(awake == 0 || life <= 0)
		{
			setInterval(function(){ 

				monster.modules.app.log("Random");
				
				let va = Math.floor((Math.random() * 4) + 1);
				switch(va) {
				    case 1:
				        run();
				        break;
				    case 2:
				        fight();
				        break;
				    case 3:
				        eat();
				        break;
				    case 4:
				        sleep();
				        break;	        
				    default:
				        sleep();
				} 
				monster.modules.app.displayStatus(life, money, awake);

			}, 12000);
		}
		else
			monster.modules.app.log("Can't random if you're dead or sleeping");

	}
	let kill = function () {
		life = -1;
		monster.modules.app.show();
		monster.modules.app.log("Le monstre est mort");
	}
	let i = 1;
	let reset = function () {
		monster.modules.actions.init("Monster"+ i, 100, 100, "0");
		monster.modules.app.show();
		i = i+1;
	}
	let getNom = function () {
		return name;
	}

	return {
		showMe,
		init,
		run,
		fight,
		work,
		eat,
		sleep,
		random,
		kill,
		reset,
		getNom
	};

}) ();


monster.modules.app = (function () {


	let start = function () {
		monster.modules.actions.init("Monster", 100, 100, 0);
		monster.modules.app.show();
		monster.modules.actions.random();

		let show = document.getElementById("show");
		show.addEventListener("click", monster.modules.app.show);

		let run = document.getElementById("run");
		run.addEventListener("click", monster.modules.actions.run);

		let fight = document.getElementById("fight");
		fight .addEventListener("click", monster.modules.actions.fight);

		let work = document.getElementById("work");
		work.addEventListener("click", monster.modules.actions.work);

		let eat = document.getElementById("eat");
		eat.addEventListener("click", monster.modules.actions.eat);

		let sleep = document.getElementById("sleep");
		sleep.addEventListener("click", monster.modules.actions.sleep);

		let kill = document.getElementById("kill");
		kill.addEventListener("click", monster.modules.actions.kill);

		let reset = document.getElementById("reset");
		reset.addEventListener("click", monster.modules.actions.reset);
	}

	let show = function () {
		monster.modules.actions.showMe();
	}

	let log = function (message) {
		let box = document.getElementById("actionbox");
		let text = document.createElement("p");
  		let contenu = document.createTextNode(message);
  		text.appendChild(contenu);
  		let prem = box.firstChild;
		box.insertBefore(text, prem);
	}

	let displayStatus = function (life,money,awake) {
		let liste = document.getElementById("status");

		let lifeli = document.createElement("li");
		let contenu = document.createTextNode("life : "+life);
		lifeli.appendChild(contenu);
		liste.replaceChild(lifeli, liste.childNodes[1]);

		let moneyli = document.createElement("li");
		contenu = document.createTextNode("money : "+money);
		moneyli.appendChild(contenu);
		liste.replaceChild(moneyli, liste.childNodes[2]);

		let text = document.createElement("li");
		if(awake === 0)
			contenu = document.createTextNode("awake");
		else
			contenu = document.createTextNode("sleep");
		text.appendChild(contenu);
		liste.replaceChild(text, liste.childNodes[3]);
		
		let color ="";

		if(life>=70)
		    color="green";
		else if(life>=50)
		    color="blue";
		else if(life>=20)
		    color="orange";
		else
		    color="red";

		let etat = document.getElementById("monster");
		etat.style.backgroundColor = color;
		etat.style.border = "solid gold";

		if(money>=125)
		    etat.style.borderWidth = "6px";
		else if(money>=100)
		    etat.style.borderWidth = "5px";
		else if(money>=75)
		    etat.style.borderWidth = "4px";
		else if(money>=50)
		    etat.style.borderWidth = "3px";
		else if(money>=25)
		    etat.style.borderWidth = "2px";
		else
			etat.style.borderWidth = "1px";

		let nom = monster.modules.actions.getNom();
		let pseudo = document.createElement("p");
		contenu = document.createTextNode(nom);
		pseudo.appendChild(contenu);
		etat.replaceChild(pseudo, etat.childNodes[1]);

	}

	return {
		start,
		show,
		log,
		displayStatus
	}

}) ();



window.addEventListener("load", () => {
	monster.modules.app.start();
});