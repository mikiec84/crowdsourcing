Images = new Mongo.Collection("images");


if (Meteor.isClient) {

  updateImage();

  Template.home.helpers({
    name : function() { return Meteor.user().services.github.username; }
  })

 Template.buttons.events({
    "click #yesbutton" : function(event) {
      updateCounter();
      console.log(Meteor.user());
      Images.update({  _id : Session.get("imageUrl") }, {$push: { vote: 1}},{ upsert: true })
      updateImage();
  },
      "click #nobutton" : function(event) {
      updateCounter();
      Images.update({  _id : Session.get("imageUrl") }, {$push: { vote: 0}},{ upsert: true })
      updateImage();
  }
 });

 function updateCounter() {
        var user = Meteor.user();
      var name = user.services.github.username; 
      var count = user.profile.count;
      count = count ? count : 0;
      Meteor.users.update({ _id : Meteor.userId()}, { $set : { 'profile.count' : count+1} });
 }

 function updateImage() {
    var n = Math.floor(Math.random()*75);
    Session.set("imageUrl", "images/"+n+".png")
 }

  Template.image.helpers({
    url: function() {      
      return Session.get("imageUrl");
    }
  });

  Template.leaderboard.helpers({

    users: function() {return Meteor.users.find({},{sort : {'profile.count': -1 } });}
  });
}