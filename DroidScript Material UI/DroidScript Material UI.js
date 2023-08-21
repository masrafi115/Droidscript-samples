cfg.Dark, cfg.MUI;

const PrimaryColor = MUI.colors.green;

var Section = "Home";

function OnStart()
{
  app.InitializeUIKit( PrimaryColor.green, "Dark" );
  app.SetStatusBarColor( MUI.colors.grey.darken4 );
  app.EnableBackKey( false );
  
  AppLayout = MUI.CreateLayout( "Absolute", "VCenter,FillX" );
  
  NavBar = MUI.CreateAppBarElegant( "DroidScript", "book", "menu,rocket", AppLayout );
  NavBar.SetOnMenuTouch( NavBar_OnMenuTouch );
  NavBar.SetOnControlTouch( NavBar_OnControlTouch );
  
  AppSelectorLayout = MUI.CreateLayout( "Linear", "Vertical,FillXY", AppLayout );
  AppSelectorLayout.SetMargins( 0, NavBar.GetHeight(), 0, 0 );
  AppSelectorLayout.SetBackground( "/Sys/ide/android_dark.png", "repeat" );
  AppSelectorLayout.SetSize( 1, 1 );
  
  DocsDrawerLayout = MUI.CreateLayout( "Linear", "VCenter,FillXY" );
  DocsWebView = app.AddWebView( DocsDrawerLayout, 1, 1, "Ignoreerrors" );
  DocsWebView.LoadUrl( "/sdcard/DroidScript/.edit/docs/Docs.htm" );
  
  app.AddDrawer( DocsDrawerLayout, "Left", 1, 1 );
  
  OtherDrawerLayout = MUI.CreateLayout( "Linear", "VCenter,FillXY" );
  SelectorTab = MUI.CreateTabFixed( "Samples,Store,Chat", 1, 1, "VCenter,FillXY", null, false, OtherDrawerLayout );
  SamplesLayout = SelectorTab.GetLayout( "Samples" );
  StoreLayout = SelectorTab.GetLayout( "Store" );
  ChatLayout = SelectorTab.GetLayout( "Chat" );
  
  StoreLayout_WebView = app.AddWebView( StoreLayout, 1, 1, "IgnoreErrors" );
  StoreLayout_WebView.LoadUrl( "hello.html" );
  
  ChatLayout_WebView = app.AddWebView( ChatLayout, 1, 1, "IgnoreErrors" );
  ChatLayout_WebView.LoadUrl( "hello.html" );
  
  app.AddDrawer( OtherDrawerLayout, "Right", 1, 1 );
  
  app.AddLayout( AppLayout );
  
  QuickMenu = MUI.CreateMenu( "New,Plugins,Settings,News,Premium,SDK,About", null, null, "Top,Right" );
  QuickMenu.SetOnSelect( QuickMenu_OnSelect );
  
  CreateDialogs();
}
function CreateDialogs()
{
  ExitAppDialog = MUI.CreateDialog( "Confirm", "Exit DroidScript?", "Yes", "Cancel", true );
  ExitAppDialog.SetOnTouch( function( a, r )
  {
    //app.Quit( a );
    if ( a ) app.Exit( true );
  });
  
  NewAppModal = UI.CreateModal( "New App", "", "Create!", "Cancel" );
  NewAppModalLayout = NewAppModal.GetLayout();
  NewAppNameTextEdit = MUI.CreateTextEditOutline( 0.7, "Left,SingleLine", "App Name", true, NewAppModalLayout );
  NewAppType = MUI.CreateSpinner( "Native,Node JS,HTML,Hybrid", 0.7, null, null, NewAppModalLayout );
  NewAppTemplate = MUI.CreateSpinner( "Simple,Game,Background Job,Background Service,Web Server,Multi-Page", 0.7, null, null, NewAppModalLayout );

  SettingsModal = UI.CreateModal( "Settings", "", "Save", "Cancel" );
  SettingsModalLayout = SettingsModal.GetLayout();
  SettingsModal_DeviceNameTextEdit = MUI.CreateTextEditOutline( 0.8, "Center", "Device Name", true, SettingsModalLayout );
  SettingsModal_DeviceNameTextEdit.SetText( app.GetModel() );
  
  var Options = [ "Use ADB", "No Icons", "Use Soft Keys", "Use Yoyo", "Stay Awake", "Auto-Help",
    "Dark Theme", "Auto-Wifi", "Use Password" ];
  
  var CurrentHorizontalLayout = MUI.CreateLayout( "Linear", "Horizontal", SettingsModalLayout );
  CurrentHorizontalLayout.SetBackColor( MUI.colors.grey.darken4 );
  
  SettingsModal_LanguageSpinner = MUI.CreateSpinner( "English,Deautsh,Español", 0.4, null, null, CurrentHorizontalLayout );
  
  var VerticalLayout1 = MUI.CreateLayout( "Linear", "VCenter", CurrentHorizontalLayout );
  VerticalLayout1.SetBackColor( MUI.colors.grey.darken4 );
  var HintText1 = MUI.CreateTextParagraph( "Font Size", 0.4, null, null, null, null, VerticalLayout1 );
  var FontSizes = [];
  for( let i = 9; i <= 18; i++ ) FontSizes.push( i );
  SettingsModal_FontSize = MUI.CreateSpinner( FontSizes.join( "," ), 0.4, null, null, VerticalLayout1 );
  
  for( let ops = 0; ops < Options.length; ops++ )
  {
    if ( ops%2 == 0 )
    {
      CurrentHorizontalLayout = MUI.CreateLayout( "Linear", "Horizontal", SettingsModalLayout );
      CurrentHorizontalLayout.SetBackColor( MUI.colors.grey.darken4 );
    }
    let chk = MUI.CreateSwitchSettings( Options[ ops ], 0.4, null, null, null, MUI.colors.grey.darken4 );
    if ( Options[ ops ] == "Use Password" ) chk.SetOnTouch( ( a, b ) => SettingsModal_Password.SetEnabled( b ) );
    CurrentHorizontalLayout.AddChild( chk );
  }
  SettingsModal_Password = MUI.CreateTextEditOutline( 0.4, "Left", "Password", true, CurrentHorizontalLayout );
  SettingsModal_GithubToken = MUI.CreateTextEditOutline( 0.8, "Left", "Github Access Token", true, SettingsModalLayout );
  
  AboutModal = UI.CreateModal( "About", "", "OK", null );
  AboutModalLayout = AboutModal.GetLayout();
  
  var dslogo = app.AddImage( AboutModalLayout, "Img/" + app.GetAppName() + ".png", 0.5 );
  AboutModalLayout_InfoTextParagraph = MUI.CreateTextParagraph( "Version: " + app.GetVersion() + "\n" + app.GetIPAddress(), 0.8, null, null, null, null, AboutModalLayout );
  AboutModalLayout_SettingsSwitch = MUI.CreateSwitchSettings( "Experiments", 0.8 );
}

function OnBack()
{
  if ( Section == "Home" ) ExitAppDialog.Show();
  else if ( Section == "Docs" )
  {
    if ( DocsWebView.CanGoBack() ) DocsWebView.Back();
    else
    {
      app.CloseDrawer( "Left" );
      Section = "Home";
    }
  }
  else if ( Section == "Other" )
  {
    app.CloseDrawer( "Right" );
    Section = "Home";
  }
}


function NavBar_OnMenuTouch()
{
  app.OpenDrawer( "Left" );
  Section = "Docs";
}
function NavBar_OnControlTouch( Text )
{
  if ( Text == "rocket" )
  {
    app.OpenDrawer( "Right" );
    Section = "Other";
  }
  else QuickMenu.Show();
}
function QuickMenu_OnSelect( Option )
{
  if ( Option == "New" ) NewAppModal.Show();
  else if ( Option == "Settings" ) SettingsModal.Show();
  else if ( Option == "About" ) AboutModal.Show();
  else app.ShowPopup( Option, "Bottom,Short" );
}