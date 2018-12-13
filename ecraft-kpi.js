define(["qlik", "jquery", "css!./style.css", "text!./template.html", "./getSheets", "./ec-about"], function (e, t, o, s, i) {
	"use strict";
	var a;
	return {
		template: s,
		initialProperties: {
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 10,
					qHeight: 50
				}]
			},
			listItems: []
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				measures: {
					uses: "measures",
					min: 1,
					max: 2
				},
				settings: {
					uses: "settings",
					items: {
						MyList: {
							type: "array",
							ref: "listItems",
							label: "Actions",
							itemTitleRef: "settings.action1type",
							allowAdd: !0,
							allowRemove: !0,
							addTranslation: "Add action",
							items: {
								actionType: {
									component: "dropdown",
									type: "string",
									defaultValue: "Field",
									options: [{
										label: "Variable",
										value: "Variable"
									}, {
										label: "Sheet",
										value: "Sheet"
									}, {
										label: "Field",
										value: "Field"
									}],
									ref: "settings.action1type",
									label: "Action Type"
								},
								actionName: {
									type: "string",
									expression: "optional",
									defaultValue: "",
									ref: "settings.action1name",
									label: function (e) {
										return "Field" == e.settings.action1type ? "Field name" : "Variable name"
									},
									show: function (e) {
										return "Sheet" != e.settings.action1type
									}
								},
								actionValue: {
									type: "string",
									expression: "optional",
									defaultValue: "",
									ref: "settings.action1value",
									label: "Value",
									show: function (e) {
										return "Sheet" != e.settings.action1type
									}
								},
								action1Method: {
									ref: "settings.action1Method",
									defaultValue: !1,
									component: "switch",
									type: "bool",
									label: "Append to field selections",
									show: function (e) {
										return "Field" == e.settings.action1type
									},
									options: [{
										label: "Append",
										value: !0
									}, {
										label: "Replace",
										value: !1
									}]
								},
								sheet: {
									type: "string",
									defaultValue: "",
									ref: "settings.sheet",
									label: "Select Sheet",
									component: "dropdown",
									options: function () {
										return i().then(function (e) {
											return e
										})
									},
									show: function (e) {
										return "Sheet" == e.settings.action1type
									}
								}
							}
						},
						colors: {
							type: "items",
							label: "Colors",
							items: {
								headerbg: {
									type: "string",
									expression: "optional",
									defaultValue: "#efefef",
									ref: "settings.headerbg",
									label: "Header background"
								},
								bg: {
									type: "string",
									expression: "optional",
									defaultValue: "transparent",
									ref: "settings.bg",
									label: "Background"
								},
								headerColor: {
									type: "string",
									expression: "optional",
									defaultValue: "black",
									ref: "settings.headercolor",
									label: "Header font color"
								},
								mainColor: {
									type: "string",
									expression: "optional",
									defaultValue: "black",
									ref: "settings.maincolor",
									label: "KPI Color (Measure 1)"
								},
								secondaryColor: {
									type: "string",
									expression: "optional",
									defaultValue: "gray",
									ref: "settings.secondarycolor",
									label: "Comparison color (Measure 2)"
								},
								indicatorColor: {
									type: "string",
									expression: "optional",
									defaultValue: "green",
									ref: "settings.indicatorcolor",
									label: "Indicator color"
								},
								borderColor: {
									type: "string",
									expression: "optional",
									defaultValue: "none",
									ref: "settings.bordercolor",
									label: "Border color"
								},
								borderWidth: {
									type: "string",
									expression: "optional",
									defaultValue: "1px",
									ref: "settings.borderwidth",
									label: "Border width"
								},
								headerBorderColor: {
									type: "string",
									expression: "optional",
									defaultValue: "none",
									ref: "settings.headerborder",
									label: "Header border color"
								}
							}
						},
						styles: {
							type: "items",
							label: "Settings",
							items: {
								label: {
									type: "string",
									expression: "optional",
									defaultValue: "",
									ref: "settings.label",
									label: "Header"
								},
								secondaryLabel: {
									type: "string",
									expression: "optional",
									defaultValue: "",
									ref: "settings.secondarylabel",
									label: "Comparison header"
								},
								simpleNumbers: {
									ref: "settings.simple",
									defaultValue: !1,
									component: "switch",
									type: "number",
									label: "Show simplified numbers",
									options: [{
										label: "Yes",
										value: !1
									}, {
										label: "No",
										value: !0
									}]
								},
								showComparison: {
									ref: "settings.ShowCompValue",
									defaultValue: 0,
									component: "switch",
									type: "number",
									label: "Show comparison",
									options: [{
										label: "No",
										value: 0
									}, {
										label: "Yes",
										value: 1
									}]
								},
								showIcon: {
									ref: "settings.ShowIcon",
									defaultValue: !1,
									component: "switch",
									type: "bool",
									label: "Show comparison icon",
									options: [{
										label: "Yes",
										value: !0
									}, {
										label: "No",
										value: !1
									}]
								},
								about: {
									component: "pp-ec-about",
									show: !0,
									translation: "eCraft",
									label: "eCraft"
								}
							}
						},
						about: {
							component: "pp-ec-about",
							show: !0,
							translation: "About",
							label: "About"
						}
					}
				}
			}
		},
		support: {
			snapshot: !0,
			"export": !0,
			exportData: !0
		},
		paint: function (t, o) {
			return a = e.currApp(), !this.$scope.data && o.settings && (this.$scope.data = e.table(this), this.$scope.settings = o.settings, this.$scope.listItems = o.listItems), this.$scope.data.rows[0].measures.length > 1 && (this.$scope.data.rows[0].measures[0].qNum - this.$scope.data.rows[0].measures[1].qNum > 0 ? this.$scope.change = "up" : this.$scope.data.rows[0].measures[0].qNum - this.$scope.data.rows[0].measures[1].qNum < 0 && (this.$scope.change = "down")), this.$scope.applyStyles(), e.Promise.resolve()
		},
		controller: ["$scope", function (t) {
			t.Math = window.Math, t.applyStyles = function () {
				t.mainKpi = {
					color: t.settings.maincolor,
					borderRight: t.settings.borderwidth + " solid " + t.settings.bordercolor,
					background: t.settings.bg
				}, t.header = {
					color: t.settings.headercolor,
					background: t.settings.headerbg,
					borderBottom: "1px solid " + t.settings.headerborder,
					borderRight: t.settings.borderwidth + " solid " + t.settings.bordercolor,
					borderTop: t.settings.borderwidth + " solid " + t.settings.bordercolor
				}, t.compareKpi = {
					color: t.settings.secondarycolor,
					borderRight: t.settings.borderwidth + " solid " + t.settings.bordercolor,
					borderBottom: t.settings.borderwidth + " solid " + t.settings.bordercolor,
					background: t.settings.bg
				}, t.content = {
					borderLeftColor: t.settings.indicatorcolor
				}
			}, t.action = function () {
				if ("edit" != e.navigation.getMode())
					for (var o = 0; o <= t.listItems.length - 1; o++) 
						
						switch (t.listItems[o].settings.action1type) {
							case "Field":
								var arr = [];
								if( isNaN( parseInt( t.listItems[o].settings.action1value ) ) ) {
									arr.push(t.listItems[o].settings.action1value );
								} else {
									arr.push ( parseInt( t.listItems[o].settings.action1value ) ); 
								}

								// Wert zuweisen an das Feld
								a.field('\'' + t.listItems[o].settings.action1name + '\'').selectValues(arr,  t.listItems[o].settings.action1Method, true);
								break;
								
							case "Sheet":
								e.navigation.gotoSheet(t.listItems[o].settings.sheet.split("|")[1]);
								break;
								
							case "Variable":

								// Variable setzten mit der neuen API
								if( isNaN( parseInt( t.listItems[o].settings.action1value ) ) ) {
									a.variable.setStringValue  (t.listItems[o].settings.action1name , t.listItems[o].settings.action1value);
								} else {
									a.variable.setNumValue  (t.listItems[o].settings.action1name , parseInt( t.listItems[o].settings.action1value ) );
								}
						}
					}
				}
			]
		}
	}
);