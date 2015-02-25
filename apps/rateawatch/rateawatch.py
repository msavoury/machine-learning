import os
import webapp2
import jinja2
import webapp2
import json

from google.appengine.ext import ndb


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class UserRating(ndb.Model):
    username = ndb.StringProperty()
    ratings = ndb.JsonProperty()


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

class APIPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        id = 6473924464345088 
        user = ndb.Key(UserRating, id).get()
        name = user.username
        self.response.write(json.dumps(name))

    def post(self):
        self.response.headers['Content-Type'] = 'application/json'
        #TODO:// Make this more secure
        json_data = json.loads(self.request.body)
        user_rating = UserRating()
        user_rating.username = json_data['username']
        user_rating.ratings = json_data['ratings']
        user_key = user_rating.put()
        self.response.write('{"user_key":"' + str(user_key.id()) +'"}')

class RatingsPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        all_ratings = UserRating.query().fetch()
        result = {}
        result['stuff'] = [x.ratings for x in all_ratings]
        self.response.write(json.dumps(result))

    def delete(self):
        ndb.delete_multi(UserRating.query().fetch(keys_only=True))
        

application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/api/rating',  RatingPage),
    ('/api/test',    APIPage),
    ('/api/ratings', RatingsPage),
], debug=True)
