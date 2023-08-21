// удаление тегов из строки
String.prototype.clearTags=function(){
    
    return this.replace(/<.*?>/g, '');
}   

// замена
String.prototype.commaToSemi=function(){
    
    return this.replace(/,/g, ";");
}    

// замена
String.prototype.colonToSemi=function(){
    
    return this.replace(/:/g, "^c^");
}    

//+++ Диалог ===================================================================

var pr_dialog = {};

var pr_object = {};
var pr_layScroll;
var pr_dlgTextHeight = 0;
var pr_dlgTopBottom = 0;

pr_dialog.show = function( p_title, p_msg, p_type, p_callBack){
   
    var _layTitleHeight = 50;// высота заголовка

    var _topLineColor = '#ff0099cc'; // цвет динии заголовка
    var _topLineHeight = 2; // толщина линии заголовка
   
    var _dens = app.GetScreenDensity()/160;
    var _width = -1;//app.GetScreenWidth()*0.9/_dens; // ширина диалога
    
    app.SetScreenMode( "" );// для правильного расчёта высоты экрана
    var _height = app.GetScreenHeight()*0.9/_dens; // высота диалога
    app.SetScreenMode( "Full" );// для коррекции режима Screen
    
    var _btnDownColor = '#ff0099cc';
    var _btnUpColor = '#22222222'

    var _bottomLineColor = '#ff666666'; // цвет динии подвала
    var _bottomLineHeight = 1; // толщина линии подвала
    
    var _btnTextColor = '#ffffffff'; // цвет текста
    
    var _layBottomHeight = 50; // высота области кнопок
    
    var _padding = 8; // отступы
    var _titleSize = 22; // размер шрифта заголовка
    var _msgSize = 18; // размер шрифта текста+
    
    var _direction = 'Horizontal'; // направление расположения информации в её области
    var _titleColor = '#ff0099cc'; // цвет заголовка
    
    var _dlg = app.CreateDialog( p_title, 'NoTitle' );
    
    // компоновщик диалога

    var _layDlg = (function(){
        var _object = app.CreateLayout( 'linear', 'Vertical');
        _object.Hide();
        var _orient = app.GetOrientation();
        if( _orient == 'Portrait' ){
            
            _width = 0.9;
            _object.SetSize( _width, -1 );
            
        } else {
            
            _width = 0.5;
            _object.SetSize( _width, -1 );
        }
        
        return _object;
    })();
    
    // заголовок окна    
        
    var _layTitle = (function(){
        var _object = app.CreateLayout( 'linear', 'vCenter,Left,FillX' );
        _object.SetSize( -1, _layTitleHeight, 'dp' );

        return _object;
    })();
        
    // линия под заголовком
    
    var _layTopLine = (function(){
        var _object = app.CreateLayout( 'linear', 'Left,FillXY' );
        _object.SetBackColor( _topLineColor );
        _object.SetSize( -1, _topLineHeight, 'dp' );

        return _object;
    })();
        
    // область сообщения
    
    var _layMsg = (function(){
        var _object = app.CreateLayout( 'linear', 'Top,Left,FillX,' + _direction );
        //_object.SetSize( _width, -1 );

        return _object;
    })();    

    // нижняя линия над кнопкой ОК

    var _layBottomLine = (function(){
        var _object = app.CreateLayout( 'linear', 'FillX' );
        _object.SetBackColor( _bottomLineColor );
        _object.SetSize( -1, _bottomLineHeight, "dp" );

        return _object;
    })();    
    
    // компоновщик для кнопок
    
    _dlg.layBottom = (function(){
        var _object = app.CreateLayout( 'linear', 'vCenter,FillXY' );
        _object.SetSize( -1, _layBottomHeight, 'dp' );

        return _object;
    })();    
    
    // скроллер для прокрутки области сообщения
    
    var _scroll = (function(){
        var _object = app.CreateScroller();
            var _layScroll = (function(){
                var _object = app.CreateLayout( 'Linear', 'fillX' );
                _object.SetSize( _width, -1 );
                return _object;
            })();
            
            _layScroll.AddChild( _layMsg );
        
        _object.AddChild( _layScroll );            
            
        return _object;
    })();    

    _layDlg.AddChild( _layTitle );   
    _layDlg.AddChild( _layTopLine );
    _layDlg.AddChild( _scroll );
    _layDlg.AddChild( _layBottomLine );
    
    _dlg.AddLayout( _layDlg );
        
    // текстовая область заголовка
    
    var _txtTitle = (function(){
        var _object = app.CreateText( p_title, -1, -1, 'left, html' );
        _object.SetTextColor( _titleColor );
        _object.SetPadding( _padding, 0, 0, 0, 'dp');
        _object.SetTextSize( _titleSize, 'dp' );
        
        return _object;
    })();

    // текстовая область сообщения

    var _txtMsg = (function(){
        var _object = app.CreateText( p_msg ,-1,-1, 'Left,Multiline,Html,FontAwesome' );
        _object.SetPadding( _padding, _padding, _padding, _padding, 'dp' );
        _object.SetTextSize( _msgSize, 'dp' );
        
        return _object;
    })();    

    // кнопка закрытия диалога
    
    var _txtClose = (function(){
        var _object = app.CreateText( 'OK' );
        _object.SetTextColor( _btnTextColor );
        _object.SetSize( -1, -1, 'fillX');
        
        _object.SetOnTouchDown( function(){
            _dlg.layBottom.SetBackColor( _btnDownColor );
        });
        
        _object.SetOnTouchUp( function(){
            _dlg.layBottom.SetBackColor( _btnUpColor );
            _dlg.Dismiss();
        });
        
        return _object;
    })();    
    
    _layTitle.AddChild( _txtTitle );

    _layMsg.AddChild( _txtMsg );
    
    if( _dlg.txeMsg ){
        
        _layMsg.AddChild( _dlg.txeMsg );
    }
    
    _dlg.layBottom.AddChild( _txtClose );
    _layDlg.AddChild( _dlg.layBottom);
    
    _dlg.Show();
    
    pr_dlgTopBottom = _layBottomHeight + _layTitleHeight;
    
    var _textHeight = (_txtMsg.GetAbsHeight()/_dens) + pr_dlgTopBottom;

    if ( _textHeight > _height ){

         _scroll.SetSize( -1, _height - pr_dlgTopBottom, 'dp' );
    }

    _layDlg.Show();
    
    pr_layScroll = _scroll;
    pr_dlgTextHeight = _textHeight;
}    

//--- Диалог ===================================================================

var pr_object = {}; // объект инспектора

var pr_abbrList=[]; // список сокращений

var pr_layMain = null; // главный компоновщик
var pr_layMainBackgroundColor = '333333'; // цвет фона главного компоновщика

var pr_layTitle = null; // компоновщик заголовка
var pr_layTitleBackgroundColor = '000099'; // цвет фона заголовка

var pr_selectedObject = null; // текстовой объект с названием выбранного для исследования объекта
var pr_systemList = null; // список элментов API
var pr_propsList = null; // список свойств
var pr_filterObject = null; // объект поля ввода фильтра
var pr_currentList = []; // вспомогательный список

var pr_investigatedObject = {object:null, name:''}; // исследуемый объект
var pr_timerFilter = null; // таймер для задержки ввода символов фильтра

var pr_alpha = '99'; // прозрачность

// задаёт объект исследования
var setSystemObject = function(){
    
    pr_investigatedObject.name = pr_systemList.GetText();
    pr_object.showList( pr_investigatedObject.name );
}

// показать свойства метода
var showProps = function(){
    
    pr_object.selectItem( arguments );
}

// изменение фильтра
var changeFilter = function(){
    
    var _run = true;
    var _filterText = pr_filterObject.GetText(); 
    
    if(( this.GetType() == 'Button' )&&( _filterText.trim().length == 0 )){
        _run = false;
    }
    
    if( _run ){
        
        clearTimeout( pr_timerFilter );
        pr_timerFilter = setTimeout( setFilter, 300, _filterText , pr_currentList );
    }    
    
}

// установка фильтра
var setFilter = function( p_filterString, p_list ){
    
    if( p_filterString.trim().length === 0 ) {
        
        pr_selectedObject.SetText( pr_investigatedObject.name );
        _filterList = p_list;
        
    } else {    

        pr_selectedObject.SetText( 'Filter' );        
        var _filterList = pr_object.getFilterList( p_filterString, p_list );
    }
    
    pr_propsList.SetVisibility( 'Hide' );
    pr_propsList.RemoveAll();
    pr_propsList.SetList( _filterList.join(',') );
    pr_propsList.SetVisibility( 'Show' );
}    

try{
    
    app.DestroyLayout( _layMain );
    
} catch(e){}

// инициализация инспектора объектов
pr_object.init = function(){

    // пакетное добавление элементов компоновщику
    function addChild( p_layout, p_elements ){
    
        for( var _i = 0; _i < p_elements.length; _i++){
            
            p_layout.AddChild( p_elements[_i] );
        }
    }

    // пакетное выполнение метода    
    function methodPack( p_elements, p_method ){
        
        var p_method = 'pr_object.' + p_method;
        
        var _func = new Function( "pr_object", p_method );
        
        for( var _i = 0; _i < p_elements.length; _i++){
           
            _func( p_elements[ _i ] );
        }
    }

    var _dens = app.GetScreenDensity()/160;
    var _layMainWidth = 0;
    var _sw = app.GetScreenWidth();
    var _sh = app.GetScreenHeight();
    var _width = 0;
    
    if( _sw < _sh ){
        
        _width = _sw;
        
    } else {
        
        _width = _sh;
    }
    
    if( app.IsTablet() ){
        
        _layMainWidth = _width/2/_dens;
        
    } else {
        
        _layMainWidth = _width/1.4/_dens;
    }
    
    var _layRowHeight = 44;
    
    var _barTitleHeight = 40;
    var _barTitleTextSize = 22;
    
    var _btnHeight = _layRowHeight;
    var _btnWidth = _btnHeight*1.8;
    
    var _txtTextSize = 18;
    var _txtWidth = 50;
    
    var _currentTextSize = 24;
    var _padding = 8;
    
    var _dlg = app.CreateDialog('','noTitle');
    
    // главный компоновщик
    var _layMain = (function(){
        
        var _object = app.CreateLayout( 'linear', 'vertical, left, top, fillY' );
        _object.Hide();
        _object.SetSize( _layMainWidth, -1, 'dp' );
        _object.SetBackColor( '#' + pr_alpha + pr_layMainBackgroundColor );
      
        return _object;
    })();
  
        var _layTitle = (function(){
            var _object = app.CreateText( 'Object Inspector', -1, -1, 'left' );
            _object.SetPadding( _padding, 0, 0, 0, 'dp' );
            _object.SetSize( -1, _barTitleHeight, 'fillX, dp' );
            _object.SetTextSize( _barTitleTextSize, 'dp' );
            _object.SetBackColor( '#' + pr_alpha + pr_layTitleBackgroundColor );
        
            return _object;
        })();

        var _laySystem = (function(){
            var _object = app.CreateLayout( 'linear', 'left,horizontal, fillX' );
            
            return _object;
        })();

        var _layUser = (function(){
            var _object = app.CreateLayout( 'linear', 'left,horizontal, fillX' );
            
            return _object;
        })();

        var _layFilter = (function(){
            var _object = app.CreateLayout( 'linear', 'left,horizontal, fillX' );
            
            return _object;
        })();
        
        var _txtCurrentObject = (function(){
            var _object = app.CreateText( 'None', -1, -1, 'left' );
            _object.SetTextSize( _currentTextSize, "dp" );
            _object.SetSize( -1, _layRowHeight, 'fillX, dp');
            _object.SetPadding( _padding, _padding, _padding, _padding, 'dp');
            _object.SetTextColor('#ff0099ff');

            return _object;
        })();
        
        //+++ Sys
            var _txtSystem = (function(){
                var _object = app.CreateText( 'API', -1, -1, 'right' );
                return _object;
            })();

            var _spnSystem = (function(){
                var _apiList = ['app','methods','objects','window'];                
                var _object = app.CreateSpinner( _apiList, -1, -1, 'fillX' );
                _object.SetOnChange( setSystemObject );
                
                return _object;
            })();
            
            var _btnSystem = (function(){
                var _object = app.CreateButton( '[fa-bolt]' , -1, -1, 'fontAwesome');
                _object.SetOnTouch( setSystemObject );
                
                return _object;
            })();    
        //--- Sys            
        //+++ User
            var _txtUser = (function(){
                var _object = app.CreateText( 'User', -1, -1, 'right' );
                
                return _object;
            })();

            var _spnUser = (function(){

                var _object = app.CreateSpinner( '', _layMainWidth - _txtWidth - _btnWidth );
                
                return _object;
            })();
            
            var _btnUser = (function(){
                var _object = app.CreateButton( '[fa-bolt]' , -1, -1, 'fontAwesome');
                
                return _object;
            })();    
        //--- User
        //+++ Filter
            var _txtFilter = (function(){
                var _object = app.CreateText( 'Filter', -1, -1, 'right' );
                
                return _object;
            })();

            var _txeFilter = (function(){
                var _object = app.CreateTextEdit( '', _layMainWidth - _txtWidth - _btnWidth );
                _object.SetOnChange( changeFilter );
                
                return _object;
            })();
            
            var _btnFilter = (function(){
                var _object = app.CreateButton( '[fa-bolt]' , -1, -1, 'fontAwesome');
                _object.SetOnTouch( changeFilter );
                
                return _object;
            })();    
        //--- Filter
        //+++ List
            var _lstProps = (function(){
                var _object = app.CreateList( '' , -1, -1, 'html');
                _object.SetSize( -1, -1 , 'fillXY' );
                _object.SetOnTouch( showProps );
                
                return _object;
            })();    
        //--- List
        
        addChild( _laySystem,
        [
            _txtSystem,
            _spnSystem,
            _btnSystem
        ]);

        addChild( _layUser,
        [
            _txtUser,
            _spnUser,
            _btnUser
        ]);

        addChild( _layFilter,
        [
            _txtFilter,
            _txeFilter,
            _btnFilter
        ]);

        addChild( _layMain,
        [
            _layTitle,
            _laySystem,
            //_layUser,
            _layFilter,
            _txtCurrentObject,
            _lstProps
        ]);
    
    // комментируется при вставке в проект    
    app.AddLayout( _layMain );

    methodPack(
    [
        _laySystem,
        _layUser,
        _layFilter
        
    ],
        'SetSize( -1, ' + _layRowHeight +' , "fillX,dp" )'
    );

    methodPack(
    [
        _txtSystem,
        _txtUser,
        _txtFilter
        
    ],
        'SetSize(' + _txtWidth+', -1, "dp" )'
    );

    methodPack(
    [
        _btnSystem,
        _btnUser,
        _btnFilter
    ],
        'SetSize(' + _btnWidth+','+_btnHeight+', "dp")'
    );

    var _spnWidth = _layMain.GetAbsWidth()/_dens - _txtWidth - _btnWidth;

    methodPack(
    [
        _spnSystem,
        _spnUser,
        _txeFilter
    ],
        'SetSize(' + _spnWidth + ','+_btnHeight+',"dp")'
    );
    
    methodPack(
    [
        _txtSystem,
        _txtUser,
        _txtFilter,
        _btnSystem,
        _btnUser,
        _btnFilter,
        _spnSystem,
        _spnUser,
        _txeFilter,
        _lstProps
    ],
        'SetTextSize(' + _txtTextSize + ', "dp")'
    );
    
    pr_layMain = _layMain;
    pr_layTitle = _layTitle;
    pr_selectedObject = _txtCurrentObject;
    pr_systemList = _spnSystem;
    pr_propsList = _lstProps;
    pr_filterObject = _txeFilter;
    pr_currentList = [];
    
    //_layMain.Show();
}

    // возвращает сокращенное название объекта по заданному полному
    pr_object.getAbbr = function( p_objectName ){
        
        return pr_abbrList[ p_objectName ];
    }    
    
 	var _color = [];
 	_color[ 'get' ] = '#00ff00';
 	_color[ 'set' ] = '#ffff00';
 	_color[ 'object' ] = '#ff7f00';
 	_color[ 'property' ] = '#999999';
    _color[ 'event' ] = '#ff00ff';
    _color[ 'new' ] = '#FF7F00';
    
    // подсветка объектов в списке
    pr_object.setColorForListItems = function( p_list ){

 	    var _title; // заголовок
 	    var _body; // тело
 	    var _icon; // картинка
 	    var _itemType; // тип свойства
        
     	for( var _i = 0, _max = p_list.length; _i < _max; _i++ ){
     	    
     	    var _split = p_list[ _i ].split( ':' );
     	    
     	    if ( _split.length == 3 ){
     	        
         	    _title = _split[0];
         	    _body = _split[1];
         	    _icon = _split[2];

         	    _itemType = _body.match(/(\w+)\s/);
         	    
         	    if( _itemType != null ){
         	        
         	        p_list[ _i ] = '<font color=' + _color[ _itemType[1] ] + '>' + _title + '</font>' + ':' + _body + ':null';
         	    }
     	    }    
     	}   
     	return p_list;
    } 	
    
    // получение методов и свойств объекта
    pr_object.getObjectMethods = function( pr_object, p_splitter ){
        
    	var _result = [];
    	
    	try {
    	    
        	for( var _i in pr_object ){
        	    
        		_result.push( _i );
        	}
        	
        	return _result.join( p_splitter );
        	
        } catch(e) {

            return null;
        }
    }
    
    // получение значений сложных объектов
    pr_object.getObjectResults = function( p_objectName, p_propName ){

        var _result = '';
        var _list = app[ p_objectName ]();

        for( var _item in _list ) {

            _result += '<br>' + _list[ _item ][ p_propName ];
        } 
        
        return _result;

    }    

    // проверка на App-объект
    pr_object.isAppObjectName = function( p_abbr ){
        
        var _find=false;
        
        for (var _i in pr_abbrList){
            
            if( pr_abbrList[_i] === p_abbr ){
                
                _find=true;
                break;
            }    
        }    
        return _find;
    }    
    
    // формирование списка свойств window
    pr_object.getWindowPropList = function(){

        var _resultArray = [];
        var _object = window;
        var _desItem; // описание пункта
        var _typeItem; // тип пункта
        var _strTypeFunc; // строковое представление типа функции
        var _argsFunc; // аргументы функции
        var _returnValue; // возвращаемое значение
        
        for( var _appProp in _object ){
        // цикл по свойствам объекта app

            try {
                
                _desItem = _object[ String( _appProp )];
                _typeItem = typeof( _desItem );
                
                if( _typeItem === 'function' ){
                // свойство-функция    
                
                    _argsFunc = String( _desItem ).match( /function.*?\)/ );
                    _argsFunc = String( _argsFunc).commaToSemi();
                    
                    var _findAbbr = pr_object.isAppObjectName( String( _appProp ));
                    
                    if( ( String( _desItem ).indexOf( 'return' ) !== -1) &&
                        ( String( _desItem ).indexOf( 'prompt' ) === -1 ) &&
                        ( String( _desItem ).indexOf( 'Create' ) === -1 ) &&
                        ( _findAbbr === false )){
                    // метод-геттер 
                        
                        _returnValue = '';
                        _strTypeFunc = 'get';
                        
                        if( typeof( _returnValue ) === 'object' ){
                        // возвращает объект

                            _returnValue = String( pr_object.getObjectMethods( _returnValue, ";" )).colonToSemi();
                            _resultArray.push( _appProp.commaToSemi() + ':' + _strTypeFunc + ' ' + _argsFunc + ' { return [' + _returnValue + '] }:null' );
                            
                        } else {
                        // возвращает простое значение

                            _returnValue = String( _returnValue ).commaToSemi().colonToSemi();
                            _resultArray.push( _appProp.commaToSemi() + ':' + _strTypeFunc + ' ' + _argsFunc + ' { return ' + _returnValue +' }:null' );
                        }    
                    } else {
                    // метод-сеттер
                        
                        if( /^on\w+?/i.test( _appProp )){
                        // обработчик событий    
                        
                            _strTypeFunc = 'event';
                            
                        } else {
                            
                            if ((/new/.test(String(_desItem)))||(/Create/.test(String(_appProp)))){
                                
                                _strTypeFunc = 'new';
                                
                            } else {
                                
                                _strTypeFunc = 'set';
                            }    
                        }    
                        _resultArray.push( String(_appProp).commaToSemi() + ':' + _strTypeFunc + ' ' + _argsFunc + ' {}:null' );
                    }    
                } 
                else if (_type==='object'){
                // свойство-объект    
                
                    if (/^on\w+?/.test(String(_appProp))) {
                        
                        _strTypeFunc = 'event';
                        
                    } else {
                        
                        _strTypeFunc = 'object';
                    }    
                    
                    _returnValue = pr_object.getObjectMethods( _object[ String( _appProp )], ";" );
                    
                    _returnValue = String(_value).substring(0,100);
                    
                    _resultArray.push( _appProp.commaToSemi() + ': ' + _strTypeFunc + ' [' + _returnValue.commaToSemi() + ']:null' );

                } else if (_type!==undefined){
                // свойство
                
                    _returnValue = _object[String(_appProp)];
                    _resultArray.push( _appProp.commaToSemi()+':property = '+String( _returnValue ).commaToSemi().colonToSemi()+':null');
                }    
            }
            catch(e){}
        }    
        
        return _resultArray;
    }
    
    // формирование списка свойств объектов
    pr_object.getObjectPropList=function( p_appObject ){
        
        var _resultArray = []; // результат
        var _object; // временный объект
        var _desItem; // объявление пункта
        var _typeItem; // тип пункта
        var _argsFunc; // аргументы функции
        var _strTypeFunc; // строковое представление типа функции
        var _returnValue; // возвращаемое значение функции
        var _list; // список значений
        
        if ( p_appObject ){
            
            _object = window[ p_appObject ];

        } else {
            
            _object = app;
        }   
        
        for( var _appProp in _object ){
            
            _desItem = _object[ String( _appProp )];

            _typeItem = typeof( _desItem );
            
            if( _typeItem === 'function' ){
                
                _argsFunc = String( _desItem ).match( /function.*?\)/ );
                
                if(( String( _desItem ).indexOf( 'return' ) != -1 ) && ( String( _desItem ).indexOf( 'Create' ) == -1 ) && ( String( _appProp ).indexOf( 'Create' ) == -1 )){
                // метод-геттер 
                    
                    _strTypeFunc = 'get';
                    _argsFunc = String( _argsFunc ).commaToSemi();
                    _returnValue = '';
                    
                    switch( _appProp ){
                        
                        case 'CreateWebSocket': break;
                        case 'CreateWebGLView': break;
                        default:{
                            
                            try {
                                
                                if( _appProp !== 'ShowKeyboard' ){
                                    
                                    _returnValue = _object[ String( _appProp )]();// вызов метода
                                }

                            } catch (e){}
                                        
                            }    
                    }    
                    
                    if( typeof( _returnValue ) !== 'object' ){
                    // возвращает простое значение

                        _returnValue = String( _returnValue ).commaToSemi().colonToSemi();
                        
                        _resultArray.push( String( _appProp ) + ':' + _strTypeFunc + ' ' + _argsFunc + ' { return ' + _returnValue + ' }:null' );
                        
                    } else if (typeof( _returnValue ) === 'object' ){
                    // возвращает объект

                        switch( _appProp ){
                    
                            case 'GetActivities':{
                                
                                _returnValue = pr_object.getObjectResults( _appProp, 'label' );

                                break;
                            }    
                            
                            case 'GetInstalledApps':{

                                _returnValue = pr_object.getObjectResults( _appProp, 'packageName' );

                                break;
                            }
                            
                            case 'GetRunningApps':{

                                _returnValue = pr_object.getObjectResults( _appProp, 'name' );

                                break;
                            }    
                            
                            case 'GetRunningServices':{

                                _returnValue = pr_object.getObjectResults( _appProp, 'name' );

                                break;
                            }    

                            case 'ListFolder':{

                                _returnValue = pr_object.getObjectResults( _appProp, 'name' );

                                break;
                            }    

                            default:{
                                
                                _returnValue = pr_object.getObjectMethods( _returnValue, ";" );
                            }
                        }    
                        
                        _returnValue = String( _returnValue ).commaToSemi().colonToSemi();
                        
                        _resultArray.push( String( _appProp ) + ':' + _strTypeFunc + ' ' + _argsFunc + ' { return [' + _returnValue + '] }:null' );
                        
                    } else {
                    // ничего не возвращает  
                    
                    }    
                } else {
                // метод-сеттер
                
                    _strTypeFunc = '';
                    
                    if ( /^SetOn\w+?/.test( _appProp )){
                        
                        _strTypeFunc = 'event';
                        
                    } else {
                        
                        if(( /new/.test( String( _desItem ))) || ( /Create/.test( String( _appProp )))){
                            
                            _strTypeFunc = 'new';
                            
                        } else {
                            
                            _strTypeFunc = 'set';
                            
                        }    
                    }    

                    _resultArray.push( String( _appProp ).commaToSemi()+':' + _strTypeFunc + ' ' + String( _argsFunc ).commaToSemi() + ' {}:null' );
                }    
            } else if( _typeItem === 'object' ){
                
            } else if( _typeItem !== undefined ){

                _returnValue = _object[ String( _appProp )];
                _resultArray.push( _appProp + ':property = ' + _returnValue + ':null' );
            }    
        }  
      // app.WriteFile('app.txt',_txt.sort().join(' '));

        return _resultArray;
    }
    
    // получить список объектов
    pr_object.getObjectsList=function(){
        
        var _resultArray=[];
        var _nameObject;
        var _titleConstructor;
        
        _resultArray.push( 'App' +':new '+'App()'+':null');
        
        for( var _appProp in app ){
        // цикл по свойствам объекта app
        
            if( _appProp.indexOf( 'Create' ) != -1 ){
            // конструктор объекта
            
                _nameObject = String(_appProp).replace( 'Create', '' );
                
                _titleConstructor = String( app[ _appProp ]).match( /function.*?\)/ ); // получение заголовка метода
                
                if( _titleConstructor != null ){
                    
                    _titleConstructor = String( _titleConstructor ).commaToSemi();
                    
                    try{

                        _resultArray.push( String(_nameObject) + ':new ' + _titleConstructor + ':null' );
                    }
                    catch(e){}
                }    
            }
        }
        return _resultArray;
    }    
    
    // получить сокращенные названия объектов
    pr_object.getAbbrList = function(){
        
        
        var _resultArray = [];
        var _objectName;
        _resultArray[ 'App' ] = 'App';
        
        var  _patternGetAbbr;//
        
        for( var _appProp in app ){
        // цикл по свойствам объекта app
        
            if( _appProp.indexOf('Create') != -1 ){
            // конструктор объекта
            
                _objectName = String( _appProp) .replace( 'Create', '' );
                
                var _desFunc = app[ 'Create' + _objectName ]; // получить описание конструктора объекта

                if( _objectName === 'Object' ){
                    
                    _resultArray[ _objectName ] = 'Obj';
                    
                } else { 
                    
                    switch ( _objectName ){
                        case 'Nxt': _resultArray[ _objectName ] = 'Nxt';break;
                        case 'Tabs': _resultArray[ _objectName ] = '_Tabs';break;
                        case 'WebSocket': _resultArray[ _objectName ] = '_WebSock';break;
                        default:
                    
                            _patternGetAbbr = String( _desFunc ).match( /new\s(.*?)\(/ );
                            
                            if( _patternGetAbbr != null ){
                
                                _resultArray[ _objectName ] = _patternGetAbbr[ 1 ].trim();
                            }     
                    }        
                }    
            }
        }
        
        return _resultArray;
    }    
    
    // получить методы app-объектов
    pr_object.getMethodList = function(){
        
        var _arrayForUnicalMethodName=[];
        var _resultArray=[];
        var _keyWords = [];
        var _typeItem;
        var _args;

        for (var _appProp in app){
        // цикл по свойствам объекта app
        
            if (_appProp.indexOf('Create')!=-1){
            // конструктор объекта
                var _nameObject=String(_appProp).replace('Create','');
                
                switch (_nameObject){
                    case 'Object':continue;break;// убираем объект из списка
                } 
                
                var _windowObject = window[ String( pr_abbrList[ _nameObject ])];// объявление конструктора объекта
                
                var _patternGetMethods = new RegExp("("+'obj'+".*function.*?\\))",'g');
                
                var _resultMethods = String(_windowObject).match(_patternGetMethods);
                
                if( _resultMethods != null ){
                    
                    for( var _t = 0, _max = _resultMethods.length; _t < _max; _t++ ){
                    // перебор методов объекта
                    
                        if( _arrayForUnicalMethodName[ _resultMethods[_t]] === undefined ){
                            
                            var _key=_resultMethods[_t].match( /obj\.(.*?)\s/ );
                            
                            if( _key != null ){
                                
                                _args = _resultMethods[ _t ].match( /function.*?\)/ );
                                _args = String( _args ).commaToSemi();
                                _arrayForUnicalMethodName[ _resultMethods[ _t ]] = '';
                            }
                            
                            _typeItem = '';
                            
                            if( /^SetOn\w+?/.test( _appProp )){
                                
                                _typeItem = 'event';
                                
                            } else {
                                
                                var _obj = pr_abbrList[ String( _nameObject )];
                                
                                if( _obj ){
                                    
                                    var _desFunc=window[_obj]()[_key[1]];

                                    if(( /new/.test( String( _desFunc ))) || ( /Create/.test( String( _desFunc )))){
                                        
                                        _typeItem = 'new';
                                        
                                    } else if( /return/.test( String( _desFunc ))){
                                        
                                        _typeItem = 'get';
                                        
                                    } else {
                                        
                                        _typeItem = 'set';
                                    }    
                                }    
                            }    
                            
                            _resultArray.push( String( _key[ 1 ]).commaToSemi() + ':' + _typeItem + ' ' + _args + ':null' );
                            
                            //_keyWords.push(String(_key[1]).commaToSemi());
                        }    
                    }    
                }    
            }
        }
        //alert(Object.keys(_keyW).sort().join(' '))
        //app.WriteFile('keywords.txt',Object.keys(_keyW).sort().join(' '));
        return _resultArray;
    }  
   
    // возвращает отформатированный список свойств объекта
    function getProperties( p_prefix, p_description ){
       
        var _resultArray = [];
        var _patternGetArgs=new RegExp( "(" + p_prefix + ".*function.*?\\))", 'g' );
        var _result = p_description.match( _patternGetArgs );
        
        if( _result != null ){
            for( var _i=0, _max = _result.length; _i < _max; _i++ ){
                
                var patternDelPrefix=new RegExp( '^' + p_prefix + '.' );
                var _desFunc =_result[_i].replace( patternDelPrefix, '' );
                var _split =_desFunc.split( '=' );
                var _name =_split[ 0 ];
                _desFunc=_split[ 1 ];
                
                if( _name !=null ){
                    _resultArray.push( '<font color="#ffffff">' + _name + '</font><br><font color="#999999">' + _desFunc + '</font>' );
                }
            }
        } 
        return _resultArray.sort().join('<br><br>');
  }  
   
    // получить очищенный список методов объекта
    pr_object.getPureListOfProperties = function( p_objectName ) {
        
        var _prefix;
        var _description = String( window[ p_objectName ]);
        var _resultList =[];
        var _parentName = _description.match(/new\s*(.*?)\(\s*id\s*\)/);
        
        if( _parentName !== null ){
            _parentName = _parentName[1];
            _description = String( window[ String(_parentName) ] );
            _resultList.push( '<b><font color=#ffff00>Parent (' + _parentName + ') properties:</font></b>' );
            _resultList.push( getProperties( 'this', _description ));
        }
        
        if(( p_objectName=== 'App' ) || ( p_objectName=='Obj' ) || ( p_objectName=='_Tabs' ) || ( p_objectName == '_WebSock' ) ){
            _prefix = 'this';
        } else {
            _prefix = 'obj';
        }    
        
        _description = String( window[ String(p_objectName) ] );
        _resultList.push( '<br><b><font color=#ffff00>Object (' + p_objectName + ') properties:</font></b>' );
        _resultList.push( getProperties( _prefix, _description ));
        
        return _resultList;
    }
    
    // получить объекты, имеющие заданный метод
    pr_object.getObjectsFromMethod = function(p_propName){
        var _resultList=[];
        var _desProperty;
        var isFunction="Метод";
        var _error="";
        var _objectList=pr_object.getObjectsList();
        var _objectName;// имя объекта
        for (var _i=0, _max=_objectList.length; _i<_max;_i++){
            _objectName=_objectList[_i].clearTags();
            _objectName=_objectName.split(':')[0];
            if (_objectName=='Tabs') continue;
            if (_objectName=='WebSocket') continue;
            if (_objectName=='SmartWatch') continue;
            try{
                var _abbr = pr_abbrList[_objectName];
                if (_abbr){
                    
                    var _appObject=window[_abbr]();
                    
                    if( typeof( _appObject ) === "object" ){
                        
                        if( _appObject.hasOwnProperty( p_propName )){
                            
                            var _type = _appObject.GetType();
                            
                            _resultList.push('<font color="#ffffff">' + _type + '</font><br><font color="#999999">'+_appObject[p_propName]+'</font>');
                        }        
                    }
                }    
            } catch(e){

            }
        }
        return '<h3>Use in objects:</h3>'+_resultList.sort().join('<br><br>');
    }
    
    // отображение списка свойств
    pr_object.showList = function( p_itemName ) {
        
        var _list = [];
        
        pr_selectedObject.SetText( p_itemName );

        switch( p_itemName ){
            
            case "app":{

             	_list = this.getObjectPropList();
                break;
            }
            
            case "window":{

             	_list = this.getWindowPropList();
                break;
            }
            
            case "objects":{

             	_list = this.getObjectsList();
                break;    
            }   
            
            case "methods":{
                
             	_list = this.getMethodList();
                break;
            }   
        }   
        
        if( _list ){
            
            _list = _list.sort();
            _list = this.setColorForListItems( _list );
            
            pr_propsList.SetList( _list );
            
            pr_currentList = _list;
        }
    } 
    
    // отображение свойств метода
    pr_object.selectItem = function( p_param ){
        
        var _propName = p_param[0].clearTags();
        var _propType = p_param[1].clearTags().match(/(\w+)\s/)[1];
        
        var _object; // временный объект
        var _resultCallFunc; // результат вызова функции
        var _desFunc; // объявление метода
        
        switch( pr_investigatedObject.name ){
            
            case 'app':{
                
                var _type = typeof( app[ _propName ] );
                
                if( _type === "function" ){

                    try {
                    // попытка выполнить метод 
                    
                        _desFunc = app[ _propName ];
                        if( _propType === 'get'){
                            
                            _resultCallFunc = _desFunc();
                        }    
                        
                    } catch (e){}    

                    var _jString = '';
                    
                    if( _resultCallFunc ){
                    
                        if( typeof(_resultCallFunc) === 'object' ){ 

                            _jString = JSON.stringify( _resultCallFunc, null, 2 );

                        } else {

                            _jString = _resultCallFunc;
                        }    

                        _jString = '\n\nreturn: \n' +_jString;
                    }  
                    
                    
                    if( pr_abbrList[ _propName.replace( /create/i, '' )]){    
                        
                        var _resultText = (_desFunc + _jString).replace( /;(?!\s*\})\s*/gm, ';\n' ); 
                        
                        _resultText = _resultText.replace( /{\s*/, '{\n' );
                        _resultText = _resultText.replace( /}/, '\n}' );
                        _resultText = _resultText.replace( /(.*;)/gm, '\t$&' );
                        
                        app.Alert( _resultText, "Constructor app." + _propName );
                        
                    } else {
                        
                        var _resultText = (_desFunc + _jString);
                        
                        _resultText = (_desFunc + _jString).replace( /{\s*/, '{\n' );
                        _resultText = _resultText.replace( /}/, '\n}' );
                        _resultText = _resultText.replace( /;(?!\s*\})/gm, ';\n' );
                        _resultText = _resultText.replace( /(.*;)/gm, '\t$&' );
                        
                        app.Alert( _resultText, "Function app." + _propName );
                    }    
                }

                break;
            } 
            
            case 'window':{
                
                if( pr_object.isAppObjectName( _propName )){
                // App-объект
                    if( _propName === '_Tabs' ){
                        
                        var _info = String(window[ _propName ]);
                        app.Alert( _info, "Description object window." + _propName );
                        
                    } else {    
                        
                        var _info = this.getPureListOfProperties( _propName ).join('<br><br>');
                        pr_dialog.show( 'Object window.'+_propName, _info, 'info' );
                    }
                    
                } else {   

                    _desFunc = window[ _propName ];
                    
                    var _type = typeof( window[ _propName ]);

                    if( _type === "function" ) {
                    
                        try {
                        // попытка выполнить метод 
                            
                            if( _propType === 'get'){
                                _resultCallFunc = _desFunc();
                            }    
                            
                        } catch (e){}    

                        var _jString = '';
                        
                        if( _resultCallFunc ){
                        
                            if( typeof(_resultCallFunc) === 'object' ){ 
                                
                                _jString = JSON.stringify( _resultCallFunc, null, 1);

                            } else {
                                _jString = _resultCallFunc;
                            }    
                            
                            _jString = '\n\nreturn: \n' +_jString;

                        } else {

                        }    
                            
                        app.Alert( _desFunc + _jString,"Function window." + _propName );
                        
                    } else if( _type === "object" ) {
                    // свойство - объект
                    
                        var _value = pr_object.getObjectMethods( window[ _propName ], ';\n' );//.columnToSimi();
                            
                            var _jString = null;
                            try {
                                _jString = JSON.stringify( _desFunc, null, 1);
                            } catch(e){}    
                            
                            if( _jString === null ){
                            // показываем раскладку по свойствам объекта    
                                _jString = '';    
                            } else {
                                _value += '\n\nProperties:\n\n' + _jString;
                            }    
                            
                            app.Alert( _value, "Object window." + _propName + '\n');

                    } else {
                    // свойство
                    
                    }    
                }    
                break;
            }
            case 'objects':{
            // объекты

                var _info = this.getPureListOfProperties( this.getAbbr( _propName )).join( '<br><br>' );
                pr_dialog.show( _propName, _info, 'info' );

                break;
            } 
            
            case 'methods':{
            // отображение информации о методе
            
                var _info = this.getObjectsFromMethod( _propName );
                
                pr_dialog.show(_propName, _info, 'info' );
                break;
            }    
        }   
    }
    
    // получение свойств пользовательского объекта
    pr_object.getUserObjectProps = function( p_objectName ){
        
        this.controls.lst_props.SetSize( -1, 0 );
        
        var _list = pr_object.getObjectPropList( p_objectName ).sort();
        _list = this.setColorForListItems( _list );

        return _list;
    }    
    
    // фильтрация свойств объекта
    pr_object.getFilterList = function( p_filter, p_list ){
        
        var _filterListProp = []; // список отфильтрованных свойств
        var _title=''; // заголовок элемента списка
        var _body=''; // тело элемента списка
        var _split; // разделитель
        
        for( var _item = 0, _maxItem = p_list.length; _item < _maxItem; _item++ ){
            
            var _patternFilter = new RegExp( '(' + p_filter + ')','i' );
            
            _split = p_list[ _item ].split(':');
            _title = _split[0].clearTags();
            
            _body = _split[1];
            
            if( _patternFilter.test(_title) ){

                _title = _title.replace( _patternFilter, '<font color=#ff0000>$1</font>' );
                _filterListProp.push( _title + ':' + _body + ':null' );
            }
        }                
        
        return _filterListProp;
    }    
    
    // возвращает компоновщик инспектора
    pr_object.getLayout = function(){
        
        return pr_layMain;
    }
    
    // показывает инспектор
    pr_object.show = function(){
        
        pr_layMain.Show();
    }
    
    pr_object.config = function(){
        
        var _dens = app.GetScreenDensity()/160;
    
        var _height = app.GetScreenHeight()*0.9/_dens; // высота диалога

        if ( pr_dlgTextHeight > _height ){
            
            pr_layScroll.SetSize(-1, _height - pr_dlgTopBottom, 'dp');
        }
    }

    // скрывает инспектор
    pr_object.hide = function(){
        
        pr_layMain.Hide();
    }
    
    // задаёт прозрачность
    pr_object.setAlpha = function( p_value ){
        
        switch( p_value){
            case '20%': p_value = '33'; break;
            case '40%': p_value = '66'; break;
            case '60%': p_value = '99'; break;
            case '80%': p_value = 'cc'; break;
            case '100%': p_value = 'ff'; break;
        }
        pr_alpha = p_value;
        pr_layMain.SetBackColor( '#' + p_value + pr_layMainBackgroundColor );
        pr_layTitle.SetBackColor( '#' + p_value + pr_layTitleBackgroundColor );
    }

pr_abbrList = pr_object.getAbbrList();

pr_object.init();

return pr_object;