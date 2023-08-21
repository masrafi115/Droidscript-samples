// Пример использования Инспектора объектов

var objInspector = Function( app.ReadFile('objectinspector.js') )();

function OnStart()
{
	
	var _layInspector = (function(){
	    var _object = app.CreateLayout( "absolute", "top,left,FillXY" );
	    
	    return _object;
	})();    


	var _lay = (function(){
	    var _object = app.CreateLayout( "linear", "top,right,FillXY" );
	    
	    return _object;
	})();    

	var _tglInspector = (function(){
	    var _object = app.CreateToggle( "Inspector" );
        _object.SetMargins( 0, 20, 0, 0, 'dp' );
        
	    _object.SetOnTouch( function( p_show ){
	        
	        if( p_show ){
	            
	            objInspector.show();
	            
	        } else {    
	            
	            objInspector.hide();
	        }     
	    });
	    
	    return _object;
	})();  
	
	var _spnAlpha = (function(){
	    var _object = app.CreateSpinner( "20%,40%,60%,80%,100%" );
	    _object.SetText( '60%' );
        _object.SetMargins( 0, 20, 0, 0, 'dp' );
        
	    _object.SetOnChange( function( p_value ){
	        
            objInspector.setAlpha( p_value );
	            
	    });
	    
	    return _object;
	})();  
	
app.CreateSysProc
	_lay.AddChild( _tglInspector );
	_lay.AddChild( _spnAlpha );
	
	app.RemoveLayout( objInspector.getLayout() );
	
	app.AddLayout( _lay );
	app.AddLayout( objInspector.getLayout() );
}

function OnConfig(){

    try{
        
        objInspector.config();
        
    }catch(e){}
}