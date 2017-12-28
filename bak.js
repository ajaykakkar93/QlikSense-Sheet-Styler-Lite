define(["qlik" ,'text!./Theme/gray.css',
					'text!./Theme/black-gray.css',
					'text!./Theme/blue-gray.css',
					'text!./Theme/green-gray.css',
					'text!./Theme/dark.css',
					'text!./Theme/dark-theme1.css',
					'text!./Theme/dark-theme2.css',
					'text!./Theme/dark-theme3.css'
		],
    function(qlik,gray,black_gray,blue_gray,green_gray,dark,dark_theme1,dark_theme2,dark_theme3) {
        //$('<style id="custom-Qs"></style>').html(css).appendTo('head');
        return {
            definition: {
                type: "items",
                component: "accordion",
                items: {
				
                    selectstyle: {
                        label: 'Select Style',
                        items: {
                            selectcustomstyle: {
                                ref: "selectcustomstyle",
                                label: "Change Sheet Style",
                                type: "boolean",
                                defaultValue: false
                            },

                            stylelist: {
                                type: "string",
                                component: "dropdown",
                                label: "Select Theme",
                                ref: "stylelist",
                                options: [{
                                        value: "1",
                                        label: "Gray"
                                    },
                                    {
                                        value: "2",
                                        label: "Black & Gray"
                                    },
                                    {
                                        value: "3",
                                        label: "Blue & Gray"
                                    },
                                    {
                                        value: "4",
                                        label: "Green & Gray"
                                    },
                                    {
                                        value: "5",
                                        label: "Dark"
                                    },
                                    {
                                        value: "6",
                                        label: "Dark Theme 1"
                                    },
                                    {
                                        value: "7",
                                        label: "Dark Theme 2"
                                    },
                                    {
                                        value: "8",
                                        label: "Dark Theme 3"
                                    }

                                ],
                                defaultValue: "1",
                                show: function(data) {
                                    if (data.selectcustomstyle) {
                                        return true;
                                    } else {
                                        return false;
                                    }

                                }
                            },

                        }
                    },
                    sheetsettings: {
                        label: 'Sheet Settings',
                        show: function(data) {
                            if (data.selectcustomstyle) {
                                return false;
                            } else {
                                return true;
                            }

                        },
                        items: {
                            changesheettitle: {
                                ref: "changesheettitle",
                                label: "Change Sheet Title",
                                type: "boolean",
                                defaultValue: false
                            },
                            titleHide: {
                                ref: "titleHide",
                                type: "boolean",
                                component: "checkbox",
                                label: "Hide Title",
                                defaultValue: false
                            },
                            titleimgwidth: {
                                type: "number",
                                component: "slider",
                                label: "Sheet Title Image Width",
                                ref: "titleimgwidth",
                                min: 35,
                                max: 198,
                                step: 1,
                                defaultValue: 35,
                                show: function(data) {
                                    if (data.titleHide) {
                                        return false;
                                    } else {
                                        return true;
                                    }

                                }
                                //end


                            },
                            sheettitle: {
                                type: "string",
                                ref: "sheettitle",
                                label: "Sheet Title",
                                expression: "optional",
                                show: function(data) {
                                    if (data.titleHide) {
                                        return false;
                                    } else {
                                        return true;
                                    }

                                }
                            },
                            titleheight: {
                                type: "number",
                                component: "slider",
                                label: "Sheet Title Height",
                                ref: "titleheight",
                                min: 15,
                                max: 200,
                                step: 1,
                                defaultValue: 36,
                                show: function(data) {
                                    if (data.titleHide) {
                                        return false;
                                    } else {
                                        return true;
                                    }

                                }
                            },

                            titlefontsize: {
                                type: "number",
                                component: "slider",
                                label: "Sheet Title Font Size",
                                ref: "titlefontsize1",
                                min: 10,
                                max: 200,
                                step: 1,
                                defaultValue: 30,
                                show: function(data) {
                                    if (data.titleHide) {
                                        return false;
                                    } else {
                                        return true;
                                    }

                                }

                            },

                            sheetbackgroundcolororimg: {
                                ref: "sheetbackgroundcolororimg",
                                label: "Background Image",
                                type: "boolean",
                                defaultValue: false
                            },
                            sheetbackground: {
                                type: "string",
                                ref: "sheetbackground",
                                label: "Sheet Background Color",
                                expression: "optional",
                                show: function(data) {
                                    if (data.sheetbackgroundcolororimg) {
                                        return false;
                                    } else {
                                        return true;
                                    }

                                }
                            },

                            sheetbackgroundimage: {
                                label: "Sheet Background Image",
                                component: "media",
                                ref: "sheetbackgroundimage",
                                layoutRef: "sheetbackgroundimage",
                                type: "string",
                                show: function(data) {
                                    if (data.sheetbackgroundcolororimg) {
                                        return true;
                                    } else {
                                        return false;
                                    }

                                }
                            },

                            sheetbackgroundimgurl: {
                                type: "string",
                                ref: "sheetbackgroundimgurl",
                                label: "Sheet Background img url",
                                expression: "optional",
                                defaultValue: 'url(/content/default/Qlik_default_orange.png)',
                                show: function(data) {
                                    if (data.sheetbackgroundcolororimg) {
                                        return true;
                                    } else {
                                        return false;
                                    }

                                }
                            },
                            gridcellactive: {
                                type: "string",
                                ref: "gridcellactive",
                                label: "Sheet Grid Active color on edit mode",
                                expression: "optional",
                                defaultValue: '#fab761',
                                show: function(data) {
                                    if (data.sheetbackgroundcolororimg) {
                                        return true;
                                    } else {
                                        return false;
                                    }

                                }
                            },


                        }
                    },

                    customstyling: {
                        label: 'Object Styling & Settings',
                        show: function(data) {
                            if (data.selectcustomstyle) {
                                return false;
                            } else {
                                return true;
                            }

                        },
                        items: {
							
							
							qvobjecttransparent: {
                                ref: "qvobjecttransparent",
                                label: "Transparent Object",
                                type: "boolean",
                                defaultValue: false
                            },
						
                            ignorekpiandtextbox: {
                                ref: "ignorekpiandtextbox",
                                label: "Ignore style for KPI and Text-Image Object",
                                type: "boolean",
                                defaultValue: false
                            },
                            customactionstyle: {
                                ref: "customactionstyle",
                                type: "boolean",
                                component: "checkbox",
                                label: "Custom Action Style",
                                defaultValue: false
                            },

                            customactionbtntop: {
                                type: "number",
                                component: "slider",
                                label: "Action Button Top Align",
                                ref: "customactionbtntop",
                                min: 1,
                                max: 100,
                                step: 1,
                                defaultValue: 1,
                                show: function(data) {
                                    if (data.customactionstyle) {
                                        return true;
                                    } else {
                                        return false;
                                    }

                                }

                            },

                            headerbgcolor: {
                                type: "string",
                                ref: "headerbgcolor",
                                label: "Header Background color",
                                expression: "optional",
                                defaultValue: '#4477aa'
                            },
                            headercolor: {
                                type: "string",
                                ref: "headercolor",
                                label: "Header color",
                                expression: "optional",
                                defaultValue: '#fff'
                            },
                            headerfontsize: {
                                type: "number",
                                component: "slider",
                                label: "Header Font Size",
                                ref: "headerfontsize",
                                min: 10,
                                max: 100,
                                step: 1,
                                defaultValue: 15

                            },
                            headerfontweight: {
                                type: "number",
                                component: "slider",
                                label: "Header Font Width",
                                ref: "headerfontweight",
                                min: 300,
                                max: 900,
                                step: 1,
                                defaultValue: 300

                            },

                            headerpaddingtop: {
                                type: "number",
                                component: "slider",
                                label: "Header Padding Top",
                                ref: "headerpaddingtop",
                                min: 0,
                                max: 100,
                                step: 1,
                                defaultValue: 11

                            },
                            headerpaddingbottom: {
                                type: "number",
                                component: "slider",
                                label: "Header Padding Bottom",
                                ref: "headerpaddingbottom",
                                min: 0,
                                max: 100,
                                step: 1,
                                defaultValue: 11

                            },
                            headerpaddingright: {
                                type: "number",
                                component: "slider",
                                label: "Header Padding Right",
                                ref: "headerpaddingright",
                                min: 0,
                                max: 100,
                                step: 1,
                                defaultValue: 11

                            },
                            headerpaddingleft: {
                                type: "number",
                                component: "slider",
                                label: "Header Padding Left",
                                ref: "headerpaddingleft",
                                min: 0,
                                max: 100,
                                step: 1,
                                defaultValue: 11

                            },

                            containerbgcolor: {
                                type: "string",
                                ref: "containerbgcolor",
                                label: "Object's Background Color",
                                expression: "optional",
                                defaultValue: '#fff'
                            },
                            actionbtncolor: {
                                type: "string",
                                ref: "actionbtncolor",
                                label: "Action Button color after fullscreen",
                                expression: "optional",
                                defaultValue: '#fff'
                            },



                            /*
								icon: {
									type: "string",
									ref: "iconname",
									label: "Icon Name",
									expression: "optional"
                            	},
								*/

                        }
                    },
                    customstylingtable: {
                        label: 'Table Styling & Settings',
                        show: function(data) {
                            if (data.selectcustomstyle) {
                                return false;
                            } else {
                                return true;
                            }

                        },
                        items: {
                            tablecolor: {
                                type: "string",
                                label: "Table color",
                                ref: "tablecolor",
                                defaultValue: "#fff",
                                expression: "optional"
                            },
                            tablebgcolor: {
                                type: "string",
                                label: "Table Background color",
                                ref: "tablebgcolor",
                                defaultValue: "#c9cacc",
                                expression: "optional"
                            },

                            tabletotalcolor: {
                                type: "string",
                                label: "Total Top color",
                                ref: "tabletotalcolor",
                                defaultValue: "#fff",
                                expression: "optional"
                            },
                            tabletotalbgcolor: {
                                type: "string",
                                label: "Total Top Background color",
                                ref: "tabletotalbgcolor",
                                defaultValue: "#c9cacc",
                                expression: "optional"
                            },
                            tabletotalbottomcolor: {
                                type: "string",
                                label: "Total Bottom color",
                                ref: "tabletotalbottomcolor",
                                defaultValue: "#fff",
                                expression: "optional"
                            },
                            tabletotalbottombgcolor: {
                                type: "string",
                                label: "Total Bottom Background color",
                                ref: "tabletotalbottombgcolor",
                                defaultValue: "#c9cacc",
                                expression: "optional"
                            },
                            tableoddcolor: {
                                type: "string",
                                label: "Total Odd color",
                                ref: "tableoddcolor",
                                defaultValue: "#ff",
                                expression: "optional"
                            },
                            tableevencolor: {
                                type: "string",
                                label: "Total Even color",
                                ref: "tableevencolor",
                                defaultValue: "#f2f2f2",
                                expression: "optional"
                            },


                        }
                    },

                    selectionbar: {
                        label: 'Selection Bar Styling & Settings',
                        show: function(data) {
                            if (data.selectcustomstyle) {
                                return false;
                            } else {
                                return true;
                            }

                        },
                        items: {
                            selectionbarHide: {
                                ref: "selectionbarHide",
                                type: "boolean",
                                component: "checkbox",
                                label: "Hide Selection Bar",
                                defaultValue: false
                            },

                            selectionbarbg: {
                                type: "string",
                                label: "SelectionBar Background color",
                                ref: "prop.selectionbarbg",
                                defaultValue: "#404b56",
                                expression: "optional",
                                show: function(data) {
                                    if (data.selectionbarHide) {
                                        return false;
                                    } else {
                                        return true;
                                    }

                                }



                            },
                            selectionbarbuttonbg: {
                                type: "string",
                                label: "SelectionBar Button Background color",
                                ref: "prop.selectionbarbuttonbg",
                                defaultValue: "#404b56",
                                expression: "optional",
                                show: function(data) {
                                    if (data.selectionbarHide) {
                                        return false;
                                    } else {
                                        return true;
                                    }

                                }
                            },
                            /*
                                    selectionbarbuttoncolor: {
                                        type: "string",
                                        label: "SelectionBar Button color",
                                        ref: "prop.selectionbarbuttoncolor",
                                        defaultValue: "gray",
                                        expression: "optional",
										show:function(data){
											if(data.selectionbarHide){
												return false;
											}else{
												return true;
											}

										}
                                    },
									*/
                            selectionbartextcolor: {
                                type: "string",
                                label: "SelectionBar Text color",
                                ref: "prop.selectionbartextcolor",
                                defaultValue: "#ffffff",
                                expression: "optional",
                                show: function(data) {
                                    if (data.selectionbarHide) {
                                        return false;
                                    } else {
                                        return true;
                                    }

                                }
                            },
                            selectionbaritemcolor: {
                                type: "string",
                                label: "SelectionBar Item color",
                                ref: "prop.selectionbaritemcolor",
                                defaultValue: "#ffffff",
                                expression: "optional",
                                show: function(data) {
                                    if (data.selectionbarHide) {
                                        return false;
                                    } else {
                                        return true;
                                    }

                                }
                            },

                            selectionbaritemhovercolor: {
                                type: "string",
                                label: "SelectionBar Item Hover color",
                                ref: "prop.selectionbaritemhovercolor",
                                defaultValue: "#404142",
                                expression: "optional",
                                show: function(data) {
                                    if (data.selectionbarHide) {
                                        return false;
                                    } else {
                                        return true;
                                    }

                                }
                            },
                        }
                    },



                }
            },

            support: {
                snapshot: false,
                export: false,
                exportData: false
            },
            paint: function($element, layout) {

				var selectcustomstyle=layout.selectcustomstyle;
				
				
				if(selectcustomstyle){
					$('#custom-Qs-selected').remove();
					
					/*
					'text!./Theme/gray.css',
					'text!./Theme/black-gray.css',
					'text!./Theme/blue-gray.css',
					'text!./Theme/green-gray.css',
					'text!./Theme/dark-theme1.css',
					'text!./Theme/dark-theme2.css',
					'text!./Theme/dark-theme3.css'
					*/
					
						if(layout.stylelist == '1'){
							$('<style id="custom-Qs-selected"></style>').html(gray).appendTo('head');
						}else if(layout.stylelist == '2'){
							$('<style id="custom-Qs-selected"></style>').html(black_gray).appendTo('head');
						}else if(layout.stylelist == '3'){
							$('<style id="custom-Qs-selected"></style>').html(blue_gray).appendTo('head');
						}else if(layout.stylelist == '4'){
							$('<style id="custom-Qs-selected"></style>').html(green_gray).appendTo('head');
						}else if(layout.stylelist == '5'){
							$('<style id="custom-Qs-selected"></style>').html(dark).appendTo('head');
						}else if(layout.stylelist == '6'){
							$('<style id="custom-Qs-selected"></style>').html(dark_theme1).appendTo('head');
						}else if(layout.stylelist == '7'){
							$('<style id="custom-Qs-selected"></style>').html(dark_theme2).appendTo('head');
						}else if(layout.stylelist == '8'){
							$('<style id="custom-Qs-selected"></style>').html(dark_theme3).appendTo('head');
						}
					
					
				}else{
					
					var headerbg = layout.headerbgcolor,
						headercolor = layout.headercolor,
						actionbtncolor = layout.actionbtncolor,
						containerbgcolor = layout.containerbgcolor,
						tablecolor = layout.tablecolor,
						tablebgcolor = layout.tablebgcolor,
						tabletotalcolor = layout.tabletotalcolor,
						tabletotalbgcolor = layout.tabletotalcolor,
						tabletotalbottombgcolor = layout.tabletotalbottombgcolor,
						tabletotalbottomcolor = layout.tabletotalbottomcolor,
						tableevencolor = layout.tableevencolor,
						tableoddcolor = layout.tableoddcolor;

					var basestyle = '';

					var objectlist = [
						'barchart',
						'combochart',
						'table',
						'pivot-table',
						'waterfallchart',
						'treemap',
						'map',
						'linechart',
						'scatterplot',
						'piechart',
						'gauge',
						'histogram',
						'distributionplot',
						'boxplot',
						'kpi',
						'text-image'
					];

					//console.log(objectlist);

					// sheet background

					if (layout.sheetbackgroundcolororimg) {

						if (layout.sheetbackgroundimage == '' || layout.sheetbackgroundimage == undefined || layout.sheetbackgroundimage == 'undefined') {
							console.log('content img : ' + layout.sheetbackgroundimgurl);
							basestyle += ' .qvt-sheet{ background:' + layout.sheetbackgroundimgurl + ' !important; }   \n ';
						} else {
							console.log('url img : ' + layout.sheetbackgroundimage);
							basestyle += ' .qvt-sheet{background:url(' + layout.sheetbackgroundimage + ') !important;   }   \n ';
						}

					} else {
						console.log('bg color : ' + layout.sheetbackground);
						basestyle += ' .qvt-sheet{ background:' + layout.sheetbackground + ' !important;   }  \n ';
					}


					// qv-gridcell active
					basestyle += '#grid .qv-gridcell.active{ border: 2px solid ' + layout.gridcellactive + ' !important; }';

					// title img
					$('.sheet-title-logo-img img').css("width", layout.titleimgwidth);


					// hide title
					if (layout.titleHide) {
						$('.sheet-title-container').hide();
					} else {
						$('.sheet-title-container').show();
					}

					// title height
					$('.sheet-title-container').css("height", layout.titleheight + 'px');
					$('#sheet-title').css("height", layout.titleheight + 'px');

					// title font size
					$('#sheet-title span').css("font-size", layout.titlefontsize1 + 'px');

					// change title
					if (layout.changesheettitle) {
						$('#sheet-title span').text(layout.sheettitle);
					}

					// hide selection bar
					if (layout.selectionbarHide) {
						$('.qvt-selections').hide();
					} else {
						$('.qvt-selections').show();
					}

					// selection bar styling
					basestyle += ' .qv-panel-current-selections{ background-color: ' + layout.prop.selectionbarbg + ' !important } \n';
					basestyle += ' .qv-panel-current-selections .buttons-end .qv-subtoolbar-button{  background-color: ' + layout.prop.selectionbarbuttonbg + ' !important } \n';
					basestyle += ' .qv-panel-current-selections .buttons .qv-subtoolbar-button{  background-color: ' + layout.prop.selectionbarbuttonbg + ' !important } \n';
					basestyle += ' .qv-panel-current-selections .buttons .qv-subtoolbar-button i {  color: ' + layout.prop.selectionbartextcolor + ' } \n';
					basestyle += ' .qv-panel-current-selections .buttons-end .qv-subtoolbar-button i{  color: ' + layout.prop.selectionbartextcolor + ' } \n';
					basestyle += ' .qv-panel-current-selections .no-selection{  color: ' + layout.prop.selectionbartextcolor + ' } \n';
					basestyle += ' .qv-panel-current-selections .item {  color: ' + layout.prop.selectionbartextcolor + ' } \n';
					basestyle += ' .qv-panel-current-selections .item:hover{ background-color: ' + layout.prop.selectionbaritemhovercolor + ' } \n';

					
					/* basic styling */
					
					if(layout.qvobjecttransparent){
						basestyle += '.qv-object{ background: transparent !important; }';
					}


					$.each(objectlist, function(k, v) {

						//header bg and other css will not apply to kpi and text obj and action navigation

						if (layout.customactionstyle) {

							basestyle += 'article.qv-object-' + v + ' .qv-inner-object .qv-object-content-container{border: 1px solid #d7cfcf;}';

							basestyle += '.grid-wrap-zoom-cell .qv-object-' + v + ' .qv-object-content-container {padding-top: 5px !important;}';

							basestyle += '.qv-object-' + v + ' .qv-object-content-container {padding-top: 5px !important;}';

							basestyle += '.qv-object-nav > a.border {border: 1px solid #ccc !important;padding: 5px !important;background: #FFFFFF !important;color: #a19a9a !important;border-radius: 0% !importnat;}';

							/* change 50px dynamic */
							basestyle += '.qv-object-nav{top: ' + layout.customactionbtntop + 'px !important;}';


							basestyle += '.grid-wrap-zoom-cell .qv-object-nav{top: 9px !important;right: 17px !important;}';
							basestyle += '.grid-wrap-zoom-cell  .qv-object-nav > a {font-size: 15px !important;}';
							basestyle += '.qv-object-nav > a {font-size: 12px !important;line-height: 14px !important;width: 14px !important;height: 14px !important;}';

							basestyle += '.qv-object-nav > a.border{border-radius: 0% !important;}';



							basestyle += '.sheet-grid article.qv-object-filterpane .qv-object-nav {top: 45px !important;}';
							basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-filterpane .qv-object-nav {top: -5px !important;}';

							basestyle += '.sheet-grid article.qv-object-text-image .qv-object-nav {top: 45px !important;}';
							basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-text-image .qv-object-nav {top: -5px !important;}';

							basestyle += '.sheet-grid article.qv-object-kpi .qv-object-nav {top: 45px !important;}';
							basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-kpi .qv-object-nav {top: -5px !important;}';

							basestyle += '.sheet-grid article.qv-object-filterpane .qv-object-nav > a {font-size: 12px !important;line-height: 14px !important;width: 14px !important;height: 14px !important;}';
							basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-filterpane .qv-object-nav > a { color: rgba(89, 89, 89, 0.6); font-size: 20px !important;line-height: 36px !important;width: 44px !important;height: 36px !important;}';

							basestyle += '.sheet-grid article.qv-object-text-image .qv-object-nav > a {font-size: 12px !important;line-height: 14px !important;width: 14px !important;height: 14px !important;}';
							basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-text-image .qv-object-nav > a {    color: rgba(89, 89, 89, 0.6); font-size: 20px !important;line-height: 36px !important;width: 44px !important;height: 36px !important;}';

							basestyle += '.sheet-grid article.qv-object-kpi .qv-object-nav > a {font-size: 12px !important;line-height: 14px !important;width: 14px !important;height: 14px !important;}';
							basestyle += '.sheet-grid.grid-wrap-zoom-cell article.qv-object-kpi .qv-object-nav > a {    color: rgba(89, 89, 89, 0.6); font-size: 20px !important;line-height: 36px !important;width: 44px !important;height: 36px !important;}';


						}

						if (layout.ignorekpiandtextbox) {

							if (v == 'kpi' || v == 'text-image') {
								basestyle += '.qv-object-' + v + ' .qv-object-content-container { border: 1px solid #d7cfcf !important;}\n';
								basestyle += 'article.qv-object-' + v + ' { background: ' + containerbgcolor + '; }';

							} else {
								basestyle += 'article.qv-object-' + v + ' .qv-inner-object header{background: ' + headerbg + '; text-transform: capitalize; padding:0px;  }\n';
								basestyle += 'article.qv-object-' + v + ' .qv-inner-object header h1.qv-object-title {color: ' + headercolor + ';font-weight: ' + layout.headerfontweight + ' !important;font-size: ' + layout.headerfontsize + 'px;}\n';
								basestyle += 'article.qv-object-' + v + ' .qv-inner-object header h1.qv-object-title .qv-object-title-text{padding: ' + layout.headerpaddingtop + 'px ' + layout.headerpaddingright + 'px ' + layout.headerpaddingbottom + 'px ' + layout.headerpaddingleft + 'px;}\n';
								basestyle += '.grid-wrap-zoom-cell .qv-object-' + v + ' .qv-object-content-container {margin-top: 5px !important;}\n';
								basestyle += '.qv-object-' + v + ' .qv-object-content-container {margin-top: 2px !important; border: 1px solid #d7cfcf !important;}\n';
								basestyle += '.grid-wrap-zoom-cell .qv-object-' + v + ' .qv-object-nav.zero-top > a {color: ' + actionbtncolor + ' !important;}\n';
								basestyle += 'article.qv-object-' + v + ' .qv-inner-object { background: ' + containerbgcolor + '; }';


							}

						} else {

							basestyle += 'article.qv-object-' + v + ' .qv-inner-object header{background: ' + headerbg + '; text-transform: capitalize; padding:0px;  }\n';
							basestyle += 'article.qv-object-' + v + ' .qv-inner-object header h1.qv-object-title {color: ' + headercolor + ';font-weight: ' + layout.headerfontweight + ' !important;font-size: ' + layout.headerfontsize + 'px;}\n';
							basestyle += 'article.qv-object-' + v + ' .qv-inner-object header h1.qv-object-title .qv-object-title-text{padding: ' + layout.headerpaddingtop + 'px ' + layout.headerpaddingright + 'px ' + layout.headerpaddingbottom + 'px ' + layout.headerpaddingleft + 'px;}\n';
							basestyle += '.grid-wrap-zoom-cell .qv-object-' + v + ' .qv-object-content-container {margin-top: 5px !important;}\n';
							basestyle += '.qv-object-' + v + ' .qv-object-content-container {margin-top: 2px !important; border: 1px solid #d7cfcf !important;}\n';
							basestyle += '.grid-wrap-zoom-cell .qv-object-' + v + ' .qv-object-nav.zero-top > a {color: ' + actionbtncolor + ' !important;}\n';
							basestyle += 'article.qv-object-' + v + ' .qv-inner-object { background: ' + containerbgcolor + '; }';


						}


					});
					/* end basic styling */


					/*table css*/

					// th column name
					basestyle += '.qv-st-header-wrapper tr:nth-child(1) {background: ' + tablebgcolor + '; color: ' + tablecolor + ' !important;}';
					// th total column
					basestyle += '.qv-st-header-wrapper tr:nth-child(2) {background: ' + tabletotalbgcolor + ' !important; color: ' + tabletotalcolor + ' !important;}';
					// total culumn buttom
					basestyle += '.qv-st-bottom-header tr{ background: ' + tabletotalbottombgcolor + ' !important;color: ' + tabletotalbottomcolor + ' !important; }';
					// pivot
					basestyle += '.qv-object-pivot-table .qv-inner-object table tr:nth-child(1) {background: ' + tablebgcolor + '; color: ' + tablecolor + ' !important;}';
					// odd
					basestyle += '.qv-object-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(even) {background: ' + tableevencolor + ' !important;}';
					//even
					basestyle += '.qv-object-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(odd) {background: ' + tableoddcolor + ' !important;}';

					/*end table css*/



					$('#custom-Qs').remove();
					$('<style id="custom-Qs"></style>').html(basestyle).appendTo('head');
			
				}
			
			

            }
        };

    });