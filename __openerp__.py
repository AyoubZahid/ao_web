{
    'name'          : 'AO WEB',
    'version'       : '0.1',
    'category'      : 'Web interface',
    'sequence'      : 0,
    'summary'       : 'Specifique feature',
    'description'   : """
            This Module add some new features
    """,
    'author'        : 'AgilOrg',
    'depends'       : ['web'],
    'installable'   : True,
    'application'   : True,
    
    'data'          :[ #'views/templates.xml',
                       'views/ao_web.xml'],
                       
                       
    'qweb'          : ['static/src/xml/ao_web.xml'],
}