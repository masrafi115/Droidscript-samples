//PopUp Javascript DS plugin v3.0.2
//Created by JohnPraise
//Contact me at: jpraise247@gmail.com

//Created Dec 21th, 2021
//Updated  May 31st, 2022

app.CreatePopUp = function(type)
 {  
    return new PopUp(type) 
 }

//Plugin wrapper class.
function PopUp(type)
{ 
   //Properties
   this.type = type || "popup";
   this.align = "bottom";
   this.txt = "PopUp";
   this.txtclr = "#fafafa";   
   this.txtsize = 14;
   this.duration = "short";   
   this.color = "#007bff";
   this.cornerradius = 5;
   this.l = this.r = this.t = this.b = 0;
//   this.mode = "dip"
   this.animatein = "flipfrombottom";
   this.animateout = "";
   this.btn = "Okay";
   this.btnclr = "#eaeaea";
   this.callback = "";
   this.state = 0;
   this.elevate = 2;
   
   //Methods
   this.SetType = function(type){ this.type = type;  if(this.type == "toast" || this.type == "toast_action"){this.elevate= 2;this.cornerradius = 5;this.color = "#262628"; this.txtsize = 16; this.txt = "Toast";if(this.align == "bottom"){this.animatein = "flipfrombottom"}else{this.animatein="flipfromtop";this.animateout="slidetotop"}}else if(this.type == "round_toast" || this.type == "round_toast_action"){ this.elevate = 2;this.color = "#262628";this.cornerradius = 25;this.txtsize = 16;if(this.align == "bottom"){this.animatein = "flipfrombottom"}else{this.animatein="flipfromtop"} }else if(this.type == "snackbar" || this.type == "snackbar_action"){ this.elevate = 0;this.color = "#262628";this.cornerradius = 0;this.txtsize = 16;this.l=this.t= this.r=this.b=0;if(this.align == "bottom"){this.animatein = "flipfrombottom"}else{this.animatein="flipfromtop"} }} 
   this.Align = function(align){ this.align = align; }
   this.SetText = function(text){ this.txt = text; }
   this.SetTextColor = function(txtclr){ this.txtclr = txtclr; }
   this.SetTextSize = function(size){ this.txtsize = size; }
   this.Duration = function(dur){ this.duration = dur; }
   this.SetColor = function(clr){ this.color = clr; }
   this.SetCornerRadius =  function(cr){ this.cornerradius = cr; }
   this.SetMargins = function(l,t,r,b){ this.l = l;this.t = t;this.r = r;this.b = b; }
   this.GetState = function(){ return PU.state ; }
   this.Hide  = function(){ PU_Function.hide()}    
   this.AnimateIn =  function(ai){ this.animatein= ai; }
   this.AnimateOut =  function(ao){ this.animateout = ao; }	
   this.SetButtonText = function (btntxt){  this.btn = btntxt; }
   this.SetButtonTextColor = function (btnclr){  this.btnclr = btnclr; }
   this.SetOnButtonTouch = function (cb){  this.callback = cb; }
   this.SetElevation = function(ev){ this.elevate = ev; }
   this.Show = function(){ PU.state++; if(PU.state == 1){ PU_Function(this.type,this.align,this.txt,this.txtclr,this.txtsize,this.duration,this.color,this.cornerradius,this.l,this.t,this.r,this.b,this.animatein,this.animateout,this.btn,this.btnclr,this.callback,this.elevate)}else{ this.animateout = ""; PU_Function.hide();PU.state = 0;this.Show()}}
   this.GetVersion = function() {  return "V 3.0.2";}
}	

function PU_Function(type,align,txt,txtclr,txtsize,dur,clr,cr,l,t,r,b,ai,ao,btn,btnclr,cb,ev){
//  if(type.match("/popup/g") == 0){
    if(align.search(/vcenter/i) == 0 || align.search(/center/i) == 0){align="vcenter,center"}if(cr > 25){cr = 25};//if(mode == null){ mode="pt"}// if(cb == null){ _pubtn.SetOnTouch(); }
    if(type == "popup"){
      //Create PopUp Main Layout
        l = l || 0.02; t = t || 0.25; r = r || 0.02; b = b || 0.12
    	_pumainlay = app.CreateLayout( "linear", align+ ",FillXY,TouchThrough" );	
    	_pumainlay.SetBackColor( "#00000000" );
    	_pumainlay.SetPadding( l, t, r, b/*, mode*/)
    	//Popup Layout
    	_pucard = app.CreateLayout( "Card", "Horizontal" )
        _pucard.SetElevation( ev)
    	_pucard.SetMargins( 0.01, 0.01, 0.01, 0.01 )
    	_pucard.SetBackColor( clr )
    	_pucard.SetCornerRadius( cr )
    	_pucardlay = app.CreateLayout( "Linear", "FillXY" )
    	_pucardlay.SetMargins( 0.055, 0.018, 0.055, 0.018  )
    	_putxt = app.CreateText( txt ,-1,-1,"fontawesome")
    	_putxt.SetTextColor( txtclr )
    	_putxt.SetTextSize( txtsize )
    	_pucardlay.AddChild( _putxt )
    	_pucard.AddChild( _pucardlay )
    	_pumainlay.AddChild( _pucard )
    	app.AddLayout( _pumainlay )
    	
      if(dur == "short"){  setTimeout(function(){ app.DestroyLayout( _pumainlay );PU.state = 0;}, 3000)}
    	else if(dur == "long"){ setTimeout(function(){ app.DestroyLayout( _pumainlay );PU.state = 0;}, 5000)}
    }else if(type == "toast" || type == "round_toast" || type == "snackbar"){
        // l = l || 0.05; t = t || 0.02; r = r || 0.05; b = b || 0.1
    	_pumainlay = app.CreateLayout( "linear", align+ ",FillXY,TouchThrough" );	
    	_pumainlay.SetBackColor( "#00000000" );
    	_pucard = app.CreateLayout( "Card", "Horizontal,FillX" )
        _pucard.SetElevation( ev)
    	_pucard.Animate( ai )
    	_pucard.SetMargins(l,t,r,b)
    	_pucard.SetBackColor( clr )
    	_pucard.SetCornerRadius( cr )
    	_pucardlay = app.CreateLayout( "Linear", "FillXY,Wrap,Left" )
    	_pucardlay.SetMargins( 0.065, 0.031, 0.065, 0.031  )
    	_putxt = app.CreateText( txt ,-1,-1,"fontawesome")
    	_putxt.SetTextColor( txtclr )
    	_putxt.SetTextSize( txtsize )
    	_pucardlay.AddChild( _putxt )
    	_pucard.AddChild( _pucardlay )
    	_pumainlay.AddChild( _pucard )
    	app.AddLayout( _pumainlay )
    	
    	if(dur == "short"){setTimeout(function(){ 	_pucard.Animate( ao);setTimeout(function(){ app.DestroyLayout( _pumainlay );PU.state = 0;}, 600)},3000);}
    	else if(dur == "long"){setTimeout(function(){  _pucard.Animate( ao );setTimeout(function(){ ;app.DestroyLayout( _pumainlay );PU.state = 0;}, 600)},5000);}
    }else if(type == "toast_action" || type == "round_toast_action" || type == "snackbar_action"){  
    	_pumainlay = app.CreateLayout( "linear", align+ ",FillXY,TouchThrough" );	
    	_pumainlay.SetBackColor( "#00000000" );
    	_pucard = app.CreateLayout( "Card", "Horizontal,FillX" )
        _pucard.SetElevation( ev)
    	_pucard.Animate( ai )
    	_pucard.SetMargins(l,t,r,b)
    	_pucard.SetBackColor( clr )
    	_pucard.SetCornerRadius( cr )
    	_pucardlay = app.CreateLayout( "Linear", "Horizontal,FillX" )
    	_pucardlay.SetMargins( 0.04, 0.0, 0.01, 0.0  )
    	_pucardlay1 = app.CreateLayout( "Linear", "Vcenter,FillY,Wrap,Left" )
    	_putxt = app.CreateText( txt ,-1,-1,"fontawesome")
    	_putxt.SetTextColor( txtclr )
    	_putxt.SetTextSize( txtsize )
        _pucardlay2 = app.CreateLayout( "Linear", "Vcenter,FillXY,Wrap,Right" )
    	_pucardlay2.SetPadding( 0.00, 0.01, 0.0, 0.0  )
        _pubtn = app.CreateButton( btn , -1,-1, "custom");
        _pubtn.SetOnTouch(cb)
        _pubtn.SetStyle( clr, clr, 4,"#000000",0,0 );
        _pubtn.SetTextColor(btnclr);
    	_pucardlay2.AddChild( _pubtn )
    	_pucardlay1.AddChild( _putxt )
    	_pucardlay.AddChild(_pucardlay1)
    	_pucardlay.AddChild( _pucardlay2 )
    	_pucard.AddChild( _pucardlay )
    	_pumainlay.AddChild( _pucard )
    	app.AddLayout( _pumainlay )
    	
    	if(dur == "short"){setTimeout(function(){ 	_pucard.Animate( ao);setTimeout(function(){ app.DestroyLayout( _pumainlay );PU.state = 0;}, 600)},3000);}
    	else if(dur == "long"){setTimeout(function(){  _pucard.Animate( ao );setTimeout(function(){ ;app.DestroyLayout( _pumainlay );PU.state = 0;}, 600)},5000);}
    }

   //  function hide(){ if(type !== "popup"){setTimeout(function(){ 	_pucard.Animate( ao);setTimeout(function(){ app.DestroyLayout( _pumainlay );this.state = 0;},600)},1000)}}
      function hide(){ if(_pumainlay != null){ app.DestroyLayout( _pumainlay );PU.state = 0;}}
      PU_Function.hide = hide;
}

PU = app.CreatePopUp()