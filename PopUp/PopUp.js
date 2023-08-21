//PopUp DS Plugin
//Created by JohnPraise
//Contact me at: jpraise247@gmail.com

//Created Dec 21st, 2021
//Updated  May 31st, 2022


app.SetBackColor( "#fa4e88" )
app.LoadScript( "BottomNav.js" );
app.LoadScript( "PopUp_v3.0.2.js" );

//Called when application is started.
function OnStart()
{      
  //Splash screen
  music = app.CreateMusic()
  splashlay = app.CreateLayout( "linear", "VCenter,FillXY" );	
  splashlay.SetBackColor( "#fa4e88" )
  logo = app.CreateImage( "Img/PopUp.png" ,0.5)
  logo.Animate("bounce")
  splashlay.AddChild( logo )
  app.AddLayout( splashlay );
  synth = music.CreateSynth("Membrane")
  synth.PlayStopTone("C2", "8n")

  //PopUp Lay
  popup = app.CreatePopUp();
  popup.SetText("[fa-info-circle] Might not display well on Larger Screens");
  popup.Align("bottom");
  popup.Duration("long");
  popup.Show();
  apbcard1 = app.CreateLayout( "Linear", "Horizontal,fillx" )
  apbcard1.SetBackColor( "#fa3d77" )
  apbcard1.SetPadding( 0.045,0.03,0.045,0.03 )
  apbtxt1 = app.CreateText( "PopUp" ,-1,-1,"bold,left,fillx")
  apbtxt1.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  apbtxt1.SetTextColor( "#fafafa" )
  apbtxt1.SetTextSize( 20 )
  apbcard1.AddChild( apbtxt1 )
  pulay = app.CreateLayout( "Linear", "FillXY,vcenter" )
  pubtn = app.CreateButton( "Show Default PopUp",-1,-1,"fillx" )
  pubtn.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  pubtn.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  pubtn.SetOnTouch( function(){popup.SetText("[fa-info-circle] I'm a PopUp!");popup.SetMargins(0,0,0,0);popup.Align("bottom");popup.Duration("short");popup.Show()})
  pubtn2 = app.CreateButton( "Align PopUp (Top)",-1,-1,"fillx" )
  pubtn2.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  pubtn2.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  pubtn2.SetOnTouch( function(){ popup.SetText("[fa-arrow-up] Aligned to Top [fa-arrow-up]");popup.SetMargins(0,0,0,0);popup.Align("top");popup.Duration("short");popup.Show()})
  pubtn3 = app.CreateButton( "Align PopUp (Center)",-1,-1,"fillx" )
  pubtn3.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  pubtn3.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  pubtn3.SetOnTouch( function(){ popup.SetText("[fa-crosshairs] Aligned to Center [fa-crosshairs]");popup.SetMargins(0,0,0,0);popup.Align("center");popup.Duration("short");popup.Show()})
  pubtn4 = app.CreateButton( "Using Margins",-1,-1,"fillx" )
  pubtn4.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  pubtn4.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  pubtn4.SetOnTouch( function(){ popup.SetText("[fa-arrow-right] Hello There");popup.SetMargins(0.6,0,0,0.09);popup.Align("bottom");popup.Duration("short");popup.Show()})
  pubtn5 = app.CreateButton( "Show PopUp for 5 Seconds (long)",-1,-1,"fillx" )
  pubtn5.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  pubtn5.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  pubtn5.SetOnTouch( function(){ popup.SetText("[fa-clock-o] 5 Seconds PopUp");popup.SetMargins(0,0,0,0);popup.Duration("long");popup.Show()})
  pubtn6 = app.CreateButton( "Hide PopUp",-1,-1,"fillx" )
  pubtn6.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  pubtn6.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  pubtn6.SetOnTouch( function(){ popup.Hide()})
  pulay.AddChild( pubtn )
  pulay.AddChild( pubtn2 )
  pulay.AddChild( pubtn3 )
  pulay.AddChild( pubtn4 )
  pulay.AddChild( pubtn5 )
  pulay.AddChild( pubtn6 )

  
  //Toast Lay
  toast = app.CreatePopUp()
  apbcard2 = app.CreateLayout( "Linear", "Horizontal,fillx" )
  apbcard2.SetBackColor( "#fa3d77" )
  apbcard2.SetPadding( 0.045,0.03,0.045,0.03 )
  apbtxt2 = app.CreateText( "Toast" ,-1,-1,"bold,left,fillx")
  apbtxt2.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  apbtxt2.SetTextColor( "#fafafa" )
  apbtxt2.SetTextSize( 20 )
  apbcard2.AddChild( apbtxt2 )
  tlay = app.CreateLayout( "Linear", "FillXY,vcenter" )
  tbtn = app.CreateButton( "Show Toast",-1,-1,"fillx" )
  tbtn.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  tbtn.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  tbtn.SetOnTouch( function(){ toast.SetType("toast");toast.SetText("[fa-info-circle] I'm a Toast!");toast.SetMargins( 0.05,0.02,0.05,0.1 );toast.Align("bottom");toast.SetColor("#262628");toast.Duration("short");toast.AnimateIn("bounceleft");toast.AnimateOut("slidetoright");toast.Show()})
  tbtn2 = app.CreateButton( "Align Toast (Top)",-1,-1,"fillx" )
  tbtn2.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  tbtn2.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  tbtn2.SetOnTouch( function(){ toast.SetType("toast");toast.SetText("[fa-arrow-up] Aligned to Top");toast.Align("top");toast.SetMargins( 0.05,0.11,0.05,0.02 );toast.SetColor("#262628");toast.AnimateIn("fadein");toast.AnimateOut("fadeout");toast.Duration("short");toast.Show()})
  tbtn3 = app.CreateButton( "Align Toast (Center)",-1,-1,"fillx" )
  tbtn3.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  tbtn3.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  tbtn3.SetOnTouch( function(){ toast.SetType("toast");toast.SetText("[fa-crosshairs] Aligned to center");toast.Align("center");toast.SetMargins( 0.05,0.11,0.05,0.02 );toast.SetColor("#262628");toast.AnimateIn("fadein");toast.AnimateOut("fadeout");toast.Duration("short");toast.Show()})
  tbtn4 = app.CreateButton( "Show Toast for 5 Seconds (long)",-1,-1,"fillx" )
  tbtn4.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  tbtn4.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  tbtn4.SetOnTouch( function(){toast.SetType("toast"); toast.SetText("[fa-clock-o] 5 Seconds Toast");toast.SetMargins( 0.05,0.02,0.05,0.1 );toast.SetColor("#262628");toast.AnimateIn("fadein");toast.AnimateOut("fadeout");toast.Align("bottom");toast.Duration("long");toast.Show()})
  tbtn5 = app.CreateButton( "Show Round Toast",-1,-1,"fillx" )
  tbtn5.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  tbtn5.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  tbtn5.SetOnTouch( function(){toast.SetType("round_toast"); toast.SetText("Round Toast");toast.SetMargins( 0.05,0.02,0.05,0.1 );toast.SetColor("#007bff");toast.AnimateIn("fadein");toast.AnimateOut("fadeout");toast.Duration("short");toast.Align("bottom");toast.Show()})  
  tbtn6 = app.CreateButton( "Show Toast with Action",-1,-1,"fillx" )
  tbtn6.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  tbtn6.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  tbtn6.SetOnTouch( function(){toast.SetType("toast_action"); toast.SetText("Toast with Action");toast.SetMargins( 0.05,0.02,0.05,0.1 );toast.SetColor("#262628");toast.AnimateIn("fadein");toast.AnimateOut("fadeout");toast.Duration("short");toast.Align("bottom");toast.SetOnButtonTouch(function(){toast.Hide();toast.SetType("toast");toast.SetText("Toast Closed");toast.Align("bottom");toast.SetMargins( 0.05,0.02,0.05,0.1 );toast.AnimateIn("fadein");toast.AnimateOut("fadeout");toast.Show()});toast.Show()})  
  tbtn7 = app.CreateButton( "Show Round Toast with Action",-1,-1,"fillx" )
  tbtn7.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  tbtn7.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  tbtn7.SetOnTouch( function(){toast.SetType("round_toast_action"); toast.SetMargins(-1,-1,-1,240);toast.SetText("Round Toast With Action");toast.SetMargins( 0.05,0.02,0.05,0.1 );toast.SetColor("#cf4450");toast.AnimateIn("fadein");toast.AnimateOut("fadeout");toast.Duration("short");toast.Align("bottom");toast.SetOnButtonTouch(function(){toast.Hide()});toast.Show()})    
  tbtn8 = app.CreateButton( "Hide Toast",-1,-1,"fillx" )
  tbtn8.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  tbtn8.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  tbtn8.SetOnTouch( function(){ toast.Hide()})
  
  tlay.AddChild( tbtn )
  tlay.AddChild( tbtn2 )
  tlay.AddChild( tbtn3 )
  tlay.AddChild( tbtn4 )
  tlay.AddChild( tbtn5 )
  tlay.AddChild( tbtn6 )
  tlay.AddChild( tbtn7 )
  tlay.AddChild( tbtn8 )
  
  //SnackBar Lay
  sb = app.CreatePopUp()
  apbcard3 = app.CreateLayout( "Linear", "Horizontal,fillx" )
  apbcard3.SetBackColor( "#fa3d77" )
  apbcard3.SetPadding( 0.045,0.03,0.045,0.03 )
  apbtxt3 = app.CreateText( "SnackBar" ,-1,-1,"bold,left,fillx")
  apbtxt3.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  apbtxt3.SetTextColor( "#fafafa" )
  apbtxt3.SetTextSize( 20 )
  apbcard3.AddChild( apbtxt3 )
  sblay = app.CreateLayout( "Linear", "FillXY,vcenter" )
  sbbtn = app.CreateButton( "Show SnackBar",-1,-1,"fillx" )
  sbbtn.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  sbbtn.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  sbbtn.SetOnTouch( function(){ sb.SetType("snackbar");sb.SetText("[fa-info-circle] I'm a SnackBar!");sb.SetMargins( 0.0,0.0,0.0,0.085 );sb.Align("bottom");sb.SetColor("#262628");sb.Duration("short");sb.AnimateIn("bounceleft");sb.AnimateOut("slidetoright");sb.Show()})
  sbbtn2 = app.CreateButton( "Align SnackBar (Top)",-1,-1,"fillx" )
  sbbtn2.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  sbbtn2.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  sbbtn2.SetOnTouch( function(){ sb.SetType("snackbar");sb.SetText("[fa-arrow-up] Aligned to Top");sb.Align("top");sb.SetMargins( 0.0,0.098,0.0,0.0 );sb.SetColor("#262628");sb.AnimateIn("bounceleft");sb.AnimateOut("slidetoright");sb.Duration("short");sb.Show()})
  sbbtn3 = app.CreateButton( "Show SnackBar for 5 Seconds (long)",-1,-1,"fillx" )
  sbbtn3.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  sbbtn3.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  sbbtn3.SetOnTouch( function(){sb.SetType("snackbar"); sb.SetText("[fa-clock-o] 5 Seconds SnackBar");sb.SetMargins( 0.0,0.0,0.0,0.085 );sb.SetColor("#262628");sb.AnimateIn("fadein");sb.AnimateOut("fadeout");sb.Align("bottom");sb.Duration("long");sb.Show()})
  sbbtn4 = app.CreateButton( "Show SnackBar with Action",-1,-1,"fillx" )
  sbbtn4.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  sbbtn4.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  sbbtn4.SetOnTouch( function(){sb.SetType("snackbar_action"); sb.SetText("SnackBar with Action");sb.SetMargins( 0.0,0.0,0.0,0.085 );sb.SetColor("#262628");sb.AnimateIn("fadein");sb.AnimateOut("fadeout");sb.Duration("short");sb.Align("bottom");sb.SetOnButtonTouch(function(){sb.Hide();sb.SetType("snackbar");sb.SetText("SnackBar Closed");sb.Align("bottom");sb.SetMargins( 0.0,0.0,0.0,0.085 );sb.AnimateIn("fadein");sb.AnimateOut("fadeout");sb.Show()});sb.Show()})  
  sbbtn5 = app.CreateButton( "Hide SnackBar",-1,-1,"fillx" )
  sbbtn5.SetStyle( "#fa4e88","#fa4e88", 4,"#000000")
  sbbtn5.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  sbbtn5.SetOnTouch( function(){ sb.Hide()})
  sblay.AddChild( sbbtn )
  sblay.AddChild( sbbtn2 )
  sblay.AddChild( sbbtn3 )
  sblay.AddChild( sbbtn4 )
  sblay.AddChild( sbbtn5 )
  
  //More Lay
  apbcard4 = app.CreateLayout( "Linear", "Horizontal,fillx" )
  apbcard4.SetBackColor( "#fa3d77" )
  apbcard4.SetPadding( 0.045,0.03,0.045,0.03 )
  apbtxt4 = app.CreateText( "More" ,-1,-1,"bold,left,fillx")
  apbtxt4.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  apbtxt4.SetTextColor( "#fafafa" )
  apbtxt4.SetTextSize( 20 )
  apbcard4.AddChild( apbtxt4 )
  mlay = app.CreateLayout( "Linear", "fillxy,wrap" )
  mlay.SetPadding( 0.02,0.0,0.02,0.0 )
  str = "<small><span style='color:#888888'>About<br>PopUp is a rebuild of SnackBar and Toast Plugin, combined into one</span></small><br>"+
  "<br><small><br>Tip:For a Persist PopUp, use (popup.Duration()</small>)"+
  "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><small style='color:#007bff!important'>Made by JohnPraise</small><br><small>"+popup.GetVersion()+"</small>"
  mtxt = app.CreateText( str ,-1,-1,"fillxy,html,multiline")
  mtxt.SetFontFile( 'Fonts/Montserrat-Light.otf' )
  mtxt.SetTextSize( 20 )
  mtxt.SetMargins( 0.01, 0.04, 0.01, 0.01 )
  mtxt.SetTextColor("#777777")
  mlay.AddChild( mtxt )


  //BottomNav
  bn = app.CreateBottomNav("#fafafa", "#eaeaea",4);
  bn.Hide()
  bn.SetIcon("[fa-star],[fa-star],[fa-star],[fa-bars]","PopUp,Toast,SnackBar,More")
  bn.SetActiveIcon(0)
  bn.SetIconColor("#888888")
  bn.SetActiveIconColor("#f05060")
  bn.AddToLay([apbcard1,pulay],[apbcard2,tlay],[apbcard3,sblay],[apbcard4,mlay])
  bn.Set()
  
  setTimeout(function(){  bn.Show();app.DestroyLayout( splashlay )},1000)
}