import os
import webapp2
import jinja2
import webapp2
import json


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        template = JINJA_ENVIRONMENT.get_template('index.html')
        template_value = { 'value': 8}
        self.response.write(template.render(template_value))

class RatingPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/html'
        template = JINJA_ENVIRONMENT.get_template('index.html')
        template_value = { 'value': 8}
        self.response.write('dammit')

    def post(self):
        self.response.headers['Content-Type'] = 'text/html'
        template = JINJA_ENVIRONMENT.get_template('index.html')
        template_value = { 'value': 8}
        json_data = json.loads(self.request.body)
        json_data['stuff'] = "marcos"
        self.response.write(json.dumps(json_data))

application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/api/rating', RatingPage),
], debug=True)
