//BottomNav Javascript DS plugin v3.0.5
//Created by JohnPraise
//Contact me at: jpraise247@gmail.com

//Created on Oct 30, 2021
// Last Updated on June 29, 2022

app.CreateBottomNav = function(navColor, layColor,  rows)
 {  
    return new BottomNav(navColor, layColor, rows) 
 }

//Plugin wrapper class.
function  BottomNav(navColor, layColor, rows)
{ 
//Properties
   _this = this;
   this.icon = ["fa-home"];
   this.iconcolor = "#999999";
   this.iconactivecolor = "#ececec";
   this.icontext = ["icon"];
   this.activeicon = 0;
   this.textsize = 12;
   this.iconsize = 20;
   this.animationin = '';
   this.animationout = '';
   this.child1 = '';
   this.child2 = '';
   this.child3 = ''; 
   this.child4 = ''; 
   this.child5 = '';
   this.visibility = ''
   this.font = 'FontAwesome';
   this.cb=null
  

   if(navColor == null || navColor == "") {this.navcolor = "#262628"}else{ this.navcolor = navColor}      
   if(rows == null || rows == "") {this.iconnum = 2 }else{ this.iconnum = rows}
   if(layColor == null || layColor == "") {this.laycolor = "#d5d5d5"}else{ this.laycolor = layColor;}

   //Methods
          
   //Set
   this.SetIcon = function(ico,txt){ this.icon = ico;this.icontext = txt; };
   this.SetTextSize = function(size){ this.textsize = size; };
   this.SetIconSize = function(icosize){ this.iconsize = icosize; };
   this.SetIconColor = function(icoclr){ this.iconcolor = icoclr; };
   this.SetNavColor = function(navClr){ this.navcolor = navClr; };
   this.SetActiveIconColor = function(icoActive){ this.iconactivecolor = icoActive; };
   this.SetActiveIcon = function(num){ this.activeicon = num; };
   this.SetIconFontFile = function(font){ this.font = font; }
   this.AddToLay = function(child1,child2,child3,child4,child5){ this.child1 = child1;this.child2 = child2;this.child3 = child3;this.child4 = child4;this.child5 = child5; };
   this.Hide = function(){ this.visibility = "hide" }
   this.Set = function(){ SetProp(this.activeicon,this.navcolor,this.iconnum,this.icon,this.icontext,this.iconcolor,this.iconactivecolor,this.animationin,this.animationout,this.iconsize,this.textsize,this.laycolor,this.child1,this.child2,this.child3,this.child4,this.child5,this.visibility,this.font,this.cb); }; 
 	this.GetActive = function(){ return this.activeicon;}
	 this.GetVersion = function(){ return "V 3.0.2"; }  	  
	 this.SetOnTouch = function(callback){  this.cb=callback }
}	

BottomNav.prototype.AnimateIn = function(ai,n){
 if(n == 1){  this.animationin = ai; _bnlay.Animate( ai );_bnlay.SetVisibility( "show" ); }
 else if(ai == 0 && n == null){ _bnlay.SetVisibility( "show" )}
   SetProp.eheight(this.GetActive(), 1 - _bnlay.GetHeight())
}

BottomNav.prototype.AnimateOut = function(ao,n){
 if(n == 1){  this.animationout = ao; _bnlay.Animate( ao ); }
 else if(ao == 0 && n == null) { _bnlay.SetVisibility( "hide" )}
  SetProp.eheight(this.GetActive(),1)
}

BottomNav.prototype.Show = function(){
  this.visibility = "show" ; _bnmainlay.SetVisibility( 'show' );
  SetProp.show( this.GetActive())
}

BottomNav.prototype.goto = function(cai){
   SetProp.goto(cai)
}


   
function  SetProp(active,navcolor,iconnum,icon,icontext,iconcolor,iconactivecolor,ai,ao,icosize,size,layClr,child1,child2,child3,child4,child5,visibility,font,callback){
    var num,set,c1=0,c2=0,c3=0,c4=0,c5=0;
    //Create bottomnav  Main Layout
  	_bnmainlay = app.CreateLayout( "Linear", "Bottom,FillXY,TouchThrough" );	
  	_bnmainlay.SetBackColor(layClr);  //_bnmainlay.SetBackColor( "#000000" );//Transparent
  	if(visibility == "hide"){ _bnmainlay.SetVisibility( "hide" )}
 	 if(visibility == "show"){ _bnmainlay.SetVisibility( "show" )}
  	
    if(child1 == null){ child1 = []}else{ c1=1} if(child2 == null){ child2 = []}else{ c2=1} if(child3 == null){ child3 = []}else{ c3=1} if(child4 == null){ child4 = []}else{ c4=1} if(child5 == null){ child5 = []}else{ c5=1}
    if(active == null) active = 0
    // if(icon == null || icon == -1) icon = ""
    // if(icontext == null || icontext == -1) icontext = ""   
    c = c1+c2+c3+c4+c5;
    if(c== 1){set=1} if(c==2){set=0}if(c== 3){set=-1} if(c==4){set=-2}if(c==5){set=-3}

  	//bottomnav Layout
  	_bnlay = app.CreateLayout( "Linear", "Horizontal,FillX" );
  	_bnlay.SetBackColor( navcolor );  
  	
  	var _iconlayWidth = 0.5, _iconlay = [], _icon = [], _icontext = [], _lay = [],icon = icon.split(","), icontext = icontext.split(",");
  
  		if(iconnum < 2 || iconnum > 5){iconnum = 2}
  		else if(iconnum == 2){ _iconlayWidth = (1/2)}
  		else if(iconnum == 3){_iconlayWidth = (1/3)}
    	else if(iconnum == 4){_iconlayWidth = (1/4)}
    	else if(iconnum == 5){_iconlayWidth = (1/5)}
  	
  	for(i = 0;i < iconnum; i++){
  	   _iconlay[i] = app.CreateLayout( "Linear", "Vertical,Hcenter,touchspy" )
  	 	_iconlay[i].SetOnTouchDown(_setActive)
  	   _iconlay[i].SetPadding( 0.015, 0.015, 0.015, 0.015);
  	   _iconlay[i].SetSize(_iconlayWidth,-1)
  	   _icon[i] = app.CreateText( icon[i],1,-1,font)
  	   if(font != null || font != "")  _icon[i].SetFontFile(font)
  	   _icon[i].SetTextSize(icosize)
  	   if(i == active){  _icon[i].SetTextColor(iconactivecolor) }else{  _icon[i].SetTextColor(iconcolor)}  	  
  	   _icontext[i] = app.CreateText( icontext[i],-1,-1 )
  	   _icontext[i].SetTextSize(size)
  	   if(i == active){  _icontext[i].SetTextColor(iconactivecolor) }else{  _icontext[i].SetTextColor(iconcolor)}
  	   _iconlay[i].AddChild( _icon[i] )
  	   _iconlay[i].AddChild( _icontext[i] )
  	   _bnlay.AddChild( _iconlay[i] )
  	}  


   _bnmainlay.AddChild( _bnlay );
   app.AddLayout( _bnmainlay );    		

    for(i = 0;i < iconnum; i++){
       //Add Scr and Layout for each tab
       icontext[i] = app.CreateLayout( "Linear", "Vertical,FillXY" ) 
  	   icontext[i].SetSize(1, 1 - _bnlay.GetHeight())
  	   icontext[i].SetBackColor(layClr)
  	   if(i == active){ icontext[active].SetVisibility("show")}else{ icontext[i].SetVisibility("hide") } 	   
     	if(visibility == "hide"){ icontext[i].SetVisibility( "hide" )}
       app.AddLayout( icontext[i] )
   }

   if(child1.length > 0){
     if(child1.length > 1){
       for(i = 0;i < child1.length; i++){ icontext[0].AddChild(child1[i]) }
     }else{
       icontext[0].AddChild(child1[0])
     }
   }  
  
   if(child2.length > 0){
     if(child2.length > 1){
       for(i = 0;i < child2.length; i++){ icontext[1].AddChild(child2[i])}
     }else{
       icontext[1].AddChild(child2[0])
     }
   }  
  
   if(child3.length > 0){
     if(child3.length > 1){
       for(i = 0;i < child3.length; i++){ icontext[2].AddChild(child3[i])}
     }else{
       icontext[2].AddChild(child3[0])
    }
  }  
  
   if(child4.length > 0){
     if(child4.length > 1){
       for(i = 0;i < child4.length; i++){ icontext[3].AddChild(child4[i])}
     }else{
       icontext[3].AddChild(child4[0])
     }
   }  
  
   if(child5.length > 0){
     if(child5.length > 1){
       for(i = 0;i < child5.length; i++){ icontext[4].AddChild(child5[i])}
    }else{
       icontext[4].AddChild(child5[0])
    } 
  } 
  
    num = JSON.stringify(_bnmainlay.id).replace(/"/g,'').replace("#",'');
  	num =parseInt(num) + c + set
     
   function _setActive(el){
     el = JSON.stringify(el).split(",");  el = el[0].slice(16).replace(/"/g,'').replace(/#/g,'');
     el = parseInt(el);     

     if(el == num || el == num + 1 || el == num + 2){
          icontext[0].SetVisibility("show");icontext[1].SetVisibility("hide");
          if(iconnum == 3) icontext[2].SetVisibility("hide");
          if(iconnum == 4){  icontext[2].SetVisibility("hide"); icontext[3].SetVisibility("hide");}
          if(iconnum == 5){ icontext[4].SetVisibility("hide"); icontext[2].SetVisibility("hide");icontext[3].SetVisibility("hide");}
          _icon[0].SetTextColor(iconactivecolor)
          _icontext[0].SetTextColor(iconactivecolor)
          _icon[1].SetTextColor(iconcolor)
          _icontext[1].SetTextColor(iconcolor)
         if(iconnum == 3){  _icon[2].SetTextColor(iconcolor);  _icontext[2].SetTextColor(iconcolor)}
         if(iconnum == 4){  _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor)}
         if(iconnum == 5){  _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor);_icon[4].SetTextColor(iconcolor); _icontext[4].SetTextColor(iconcolor)}     
         if(callback!=null) callback(0,_this.icontext.split(",")[0])
        _this.activeicon = 0
     }else if(el == num+3 || el == num + 4 || el == num + 5){
          icontext[1].SetVisibility("show");icontext[0].SetVisibility("hide");
          if(iconnum == 3) icontext[2].SetVisibility("hide");
          if(iconnum == 4){  icontext[2].SetVisibility("hide"); icontext[3].SetVisibility("hide");}
          if(iconnum == 5){ icontext[4].SetVisibility("hide");icontext[2].SetVisibility("hide");icontext[3].SetVisibility("hide");}
          _icon[0].SetTextColor(iconcolor)
          _icontext[0].SetTextColor(iconcolor)
          _icon[1].SetTextColor(iconactivecolor)
          _icontext[1].SetTextColor(iconactivecolor)
          if(iconnum == 3){ _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor)}
          if(iconnum == 4){ _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor)}
          if(iconnum == 5){ _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor);_icon[4].SetTextColor(iconcolor); _icontext[4].SetTextColor(iconcolor)}
          if(callback!=null) callback(1,_this.icontext.split(",")[1])
           _this.activeicon = 1
       }else if(el == num+6 || el == num + 7 || el == num + 8){
          if(iconnum == 5){ icontext[2].SetVisibility("show"); icontext[4].SetVisibility("hide");icontext[3].SetVisibility("hide");}
          if(iconnum == 4){  icontext[2].SetVisibility("show");icontext[3].SetVisibility("hide");}       
          if(iconnum == 3) icontext[2].SetVisibility("show");
          icontext[1].SetVisibility("hide");icontext[0].SetVisibility("hide");
          _icon[0].SetTextColor(iconcolor)
          _icontext[0].SetTextColor(iconcolor)
          _icon[1].SetTextColor(iconcolor)
          _icontext[1].SetTextColor(iconcolor)
          if(iconnum == 3){ _icon[2].SetTextColor(iconactivecolor);_icontext[2].SetTextColor(iconactivecolor)}
          if(iconnum == 4){  _icon[2].SetTextColor(iconactivecolor);_icontext[2].SetTextColor(iconactivecolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor)}
          if(iconnum == 5){ _icon[2].SetTextColor(iconactivecolor);_icontext[2].SetTextColor(iconactivecolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor);_icon[4].SetTextColor(iconcolor);_icontext[4].SetTextColor(iconcolor)}
          if(callback!=null)  callback(2,_this.icontext.split(",")[2])
        _this.activeicon = 2
    }else if(el == num+9 || el == num + 10 || el == num + 11){
         if(iconnum == 5){ icontext[3].SetVisibility("show");icontext[4].SetVisibility("hide");icontext[2].SetVisibility("hide");}
         if(iconnum == 4){ icontext[3].SetVisibility("show");icontext[2].SetVisibility("hide");}      
          icontext[1].SetVisibility("hide");icontext[0].SetVisibility("hide");icontext[2].SetVisibility("hide");
          _icon[0].SetTextColor(iconcolor)
          _icontext[0].SetTextColor(iconcolor)
          _icon[1].SetTextColor(iconcolor)
          _icontext[1].SetTextColor(iconcolor)
          if(iconnum == 3){  _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor)}
          if(iconnum == 4){  _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconactivecolor);_icontext[3].SetTextColor(iconactivecolor)}
          if(iconnum == 5){ _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor); _icon[3].SetTextColor(iconactivecolor);_icontext[3].SetTextColor(iconactivecolor); _icon[4].SetTextColor(iconcolor);  _icontext[4].SetTextColor(iconcolor)}
          if(callback!=null) callback(3,_this.icontext.split(",")[3])
          _this.activeicon = 3
      }else if(el == num+12 || el == num + 13 || el == num + 14){
          icontext[4].SetVisibility("show"); icontext[0].SetVisibility("hide");icontext[3].SetVisibility("hide");icontext[1].SetVisibility("hide");icontext[2].SetVisibility("hide")
          _icon[0].SetTextColor(iconcolor)
          _icontext[0].SetTextColor(iconcolor)
          _icon[1].SetTextColor(iconcolor)
          _icontext[1].SetTextColor(iconcolor)
          if(iconnum == 3){  _icon[2].SetTextColor(iconcolor);_icontext[2].SetTextColor(iconcolor)}
          if(iconnum == 4){  _icon[3].SetTextColor(iconcolor);  _icontext[3].SetTextColor(iconcolor)}
          if(iconnum == 5){   _icon[2].SetTextColor(iconcolor);_icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconcolor);  _icontext[3].SetTextColor(iconcolor);_icon[4].SetTextColor(iconactivecolor);_icontext[4].SetTextColor(iconactivecolor)}
          if(callback!=null) callback(4,_this.icontext.split(",")[4])
         _this.activeicon = 4
      }
  }
  
  function goto(n){
    if(n == 0){
          icontext[0].SetVisibility("show");icontext[1].SetVisibility("hide");
          if(iconnum == 3) icontext[2].SetVisibility("hide");
          if(iconnum == 4){  icontext[2].SetVisibility("hide"); icontext[3].SetVisibility("hide");}
          if(iconnum == 5){ icontext[4].SetVisibility("hide"); icontext[2].SetVisibility("hide");icontext[3].SetVisibility("hide");}
          _icon[0].SetTextColor(iconactivecolor)
          _icontext[0].SetTextColor(iconactivecolor)
          _icon[1].SetTextColor(iconcolor)
          _icontext[1].SetTextColor(iconcolor)
         if(iconnum == 3){  _icon[2].SetTextColor(iconcolor);  _icontext[2].SetTextColor(iconcolor)}
         if(iconnum == 4){  _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor)}
         if(iconnum == 5){  _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor);_icon[4].SetTextColor(iconcolor); _icontext[4].SetTextColor(iconcolor)}
     }else if(n == 1){
          icontext[1].SetVisibility("show");icontext[0].SetVisibility("hide");
          if(iconnum == 3) icontext[2].SetVisibility("hide");
          if(iconnum == 4){  icontext[2].SetVisibility("hide"); icontext[3].SetVisibility("hide");}
          if(iconnum == 5){ icontext[4].SetVisibility("hide");icontext[2].SetVisibility("hide");icontext[3].SetVisibility("hide");}
          _icon[0].SetTextColor(iconcolor)
          _icontext[0].SetTextColor(iconcolor)
          _icon[1].SetTextColor(iconactivecolor)
          _icontext[1].SetTextColor(iconactivecolor)
          if(iconnum == 3){ _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor)}
          if(iconnum == 4){ _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor)}
          if(iconnum == 5){ _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor);_icon[4].SetTextColor(iconcolor); _icontext[4].SetTextColor(iconcolor)}
     }else if(n == 2){
          if(iconnum == 5){ icontext[2].SetVisibility("show"); icontext[4].SetVisibility("hide");icontext[3].SetVisibility("hide");}
          if(iconnum == 4){  icontext[2].SetVisibility("show");icontext[3].SetVisibility("hide");}       
          if(iconnum == 3) icontext[2].SetVisibility("show");
          icontext[1].SetVisibility("hide");icontext[0].SetVisibility("hide");
          _icon[0].SetTextColor(iconcolor)
          _icontext[0].SetTextColor(iconcolor)
          _icon[1].SetTextColor(iconcolor)
          _icontext[1].SetTextColor(iconcolor)
          if(iconnum == 3){ _icon[2].SetTextColor(iconactivecolor);_icontext[2].SetTextColor(iconactivecolor)}
          if(iconnum == 4){  _icon[2].SetTextColor(iconactivecolor);_icontext[2].SetTextColor(iconactivecolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor)}
          if(iconnum == 5){ _icon[2].SetTextColor(iconactivecolor);_icontext[2].SetTextColor(iconactivecolor);_icon[3].SetTextColor(iconcolor); _icontext[3].SetTextColor(iconcolor);_icon[4].SetTextColor(iconcolor);_icontext[4].SetTextColor(iconcolor)}
     }else if(n == 3){
         if(iconnum == 5){ icontext[3].SetVisibility("show");icontext[4].SetVisibility("hide");icontext[2].SetVisibility("hide");}
         if(iconnum == 4){ icontext[3].SetVisibility("show");icontext[2].SetVisibility("hide");}    
         icontext[1].SetVisibility("hide");icontext[0].SetVisibility("hide");icontext[2].SetVisibility("hide");
        
       //   icontext[3].SetVisibility("show");icontext[0].SetVisibility("hide");icontext[1].SetVisibility("hide");icontext[4].SetVisibility("hide");icontext[2].SetVisibility("hide")
          _icon[0].SetTextColor(iconcolor)
          _icontext[0].SetTextColor(iconcolor)
          _icon[1].SetTextColor(iconcolor)
          _icontext[1].SetTextColor(iconcolor)
          if(iconnum == 3){  _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor)}
          if(iconnum == 4){  _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconactivecolor);_icontext[3].SetTextColor(iconactivecolor)}
          if(iconnum == 5){ _icon[2].SetTextColor(iconcolor); _icontext[2].SetTextColor(iconcolor); _icon[3].SetTextColor(iconactivecolor);_icontext[3].SetTextColor(iconactivecolor); _icon[4].SetTextColor(iconcolor);  _icontext[4].SetTextColor(iconcolor)}
     }else if(n == 4){
          icontext[4].SetVisibility("show"); icontext[0].SetVisibility("hide");icontext[3].SetVisibility("hide");icontext[1].SetVisibility("hide");icontext[2].SetVisibility("hide")
          _icon[0].SetTextColor(iconcolor)
          _icontext[0].SetTextColor(iconcolor)
          _icon[1].SetTextColor(iconcolor)
          _icontext[1].SetTextColor(iconcolor)
          if(iconnum == 3){  _icon[2].SetTextColor(iconcolor);_icontext[2].SetTextColor(iconcolor)}
          if(iconnum == 4){  _icon[3].SetTextColor(iconcolor);  _icontext[3].SetTextColor(iconcolor)}
          if(iconnum == 5){   _icon[2].SetTextColor(iconcolor);_icontext[2].SetTextColor(iconcolor);_icon[3].SetTextColor(iconcolor);  _icontext[3].SetTextColor(iconcolor);_icon[4].SetTextColor(iconactivecolor);_icontext[4].SetTextColor(iconactivecolor)}
       }
    }
     SetProp.goto  = goto;
     
     function show(n){
         icontext[n].SetVisibility('show')
     }     
     SetProp.show = show;
     
     function eheight(c,n){
     /*current = 1 - _bnlay.GetHeight();
     icontext[c].SetBackColor("#ff0000")
     for(i =current + 0.000001;i<1.000001;i--){
     alert(i)
     //  icontext[c].SetSize(1, i)
       if(i >0.99999){ icontext[c].SetSize(1, 1)}
     }*/
    	  icontext[c].SetSize(1, n)
     }
     SetProp.eheight = eheight;
     
     function nheight(c,n){
    	   icontext[c].SetSize(1, n)
     }
     SetProp.nheight = nheight;
     
     function hidenav(c,n){
    	   icontext[c].SetSize(1, n)
     }
     SetProp.hidenav = hidenav;
 
}

//BOTTOMNAV = app.CreateBottomNav()