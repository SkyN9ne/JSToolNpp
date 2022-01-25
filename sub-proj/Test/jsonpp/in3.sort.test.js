{
	"web-app": {
		"servlet": [{
			"init-param": {
				"cachePackageTagsRefresh": 60,
				"cachePackageTagsStore": 200,
				"cachePackageTagsTrack": 200,
				"cachePagesDirtyRead": 10,
				"cachePagesRefresh": 10,
				"cachePagesStore": 100,
				"cachePagesTrack": 200,
				"cacheTemplatesRefresh": 15,
				"cacheTemplatesStore": 50,
				"cacheTemplatesTrack": 100,
				"configGlossary:adminEmail": "ksm@pobox.com",
				"configGlossary:installationAt": "Philadelphia, PA",
				"configGlossary:poweredBy": "Cofax",
				"configGlossary:poweredByIcon": "/images/cofax.gif",
				"configGlossary:staticPath": "/content/static",
				"dataStoreClass": "org.cofax.SqlDataStore",
				"dataStoreConnUsageLimit": 100,
				"dataStoreDriver": "com.microsoft.jdbc.sqlserver.SQLServerDriver",
				"dataStoreInitConns": 10,
				"dataStoreLogFile": "/usr/local/tomcat/logs/datastore.log",
				"dataStoreLogLevel": "debug",
				"dataStoreMaxConns": 100,
				"dataStoreName": "cofax",
				"dataStorePassword": "dataStoreTestQuery",
				"dataStoreTestQuery": "SET NOCOUNT ON;select test='test';",
				"dataStoreUrl": "jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon",
				"dataStoreUser": "sa",
				"defaultFileTemplate": "articl'eT'em\"plate.htm",
				"defaultListTemplate": "listTemplate.htm",
				"jspFileTemplate": "articleTemplate.jsp",
				"jspListTemplate": "lis\"tTe'mpla\"te.jsp",
				"maxUrlLength": 500,
				"redirectionClass": "org.cofax.SqlRedirection",
				"searchEngineFileTemplate": "forSearchEngines.htm",
				"searchEngineListTemplate": "forSearchEnginesList.htm",
				"searchEngineRobotsDb": "WEB-INF/robots.db",
				"templateLoaderClass": "org.cofax.FilesTemplateLoader",
				"templateOverridePath": "",
				"templatePath": "templates",
				"templateProcessorClass": "org.cofax.WysiwygTemplate",
				"useDataStore": true,
				"useJSP": false
			},
			"servlet-class": "org.cofax.cds.CDSServlet",
			"servlet-name": "cofaxCDS"
		}, {
			"init-param": {
				"mailHost": "mail1",
				"mailHostOverride": "mail2"
			},
			"servlet-class": "org.cofax.cds.EmailServlet",
			"servlet-name": "cofaxEmail"
		}, {
			"servlet-class": "org.cofax.cds.AdminServlet",
			"servlet-name": "cofaxAdmin"
		}, {
			"servlet-class": "org.cofax.cds.FileServlet",
			"servlet-name": "fileServlet"
		}, {
			"init-param": {
				"adminGroupID": 4,
				"betaServer": true,
				"dataLog": 1,
				"dataLogLocation": "/usr/local/tomcat/logs/dataLog.log",
				"dataLogMaxSize": "",
				"fileTransferFolder": "/usr/local/tomcat/webapps/content/fileTransferFolder",
				"log": 1,
				"logLocation": "/usr/local/tomcat/logs/CofaxTools.log",
				"logMaxSize": "",
				"lookInContext": 1,
				"removePageCache": "/content/admin/remove?cache=pages&id=",
				"removeTemplateCache": "/content/admin/remove?cache=templates&id=",
				"templatePath": "toolstemplates/"
			},
			"servlet-class": "org.cofax.cms.CofaxToolsServlet",
			"servlet-name": "cofaxTools"
		}],
		"servlet-mapping": {
			"cofaxAdmin": "/admin/*",
			"cofaxCDS": "/",
			"cofaxEmail": "/cofaxutil/aemail/*",
			"cofaxTools": "/tools/*",
			"fileServlet": "/static/*"
		},
		"taglib": {
			"taglib-location": "/WEB-INF/tlds/cofax.tld",
			"taglib-uri": "cofax.tld"
		}
	}
}