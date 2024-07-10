from app import app,db
from flask import request,jsonify
from model import Bestie

#Get all besties
@app.route("/api/besties",methods=["GET"])
def get_besties():
    besties=Bestie.query.all()
    result=[bestie.to_json() for bestie in besties]
    return jsonify(result)
# Create a friend
@app.route("/api/besties",methods=["POST"])
def create_besties():
    try:
        data=request.json
        required_fields=["name","role","description","gender"]
        for field in required_fields:
            if field not in data:
                return jsonify({"msg":f"Missing field:{field}"})
        
        name = data.get("name")
        role = data.get("role")
        description=data.get("description")
        gender=data.get("gender")
        #fetch avatar image based on gender
        if gender == "male":
            img_url =f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female": 
            img_url =f"https://avatar.iran.liara.run/public/girl?username={name}"  
        else:
            img_url=None     
        new_bestie=Bestie(name=name,role=role,description=description,gender=gender,img_url=img_url)
        db.session.add(new_bestie)
        db.session.commit()
        
        return jsonify({"msg":"A new Bestie"}),201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500
    
# Delete Bestie

@app.route("/api/besties/<int:id>",methods=["DELETE"])   
def delete_bestie(id) :
    try:
        bestie = Bestie.query.get(id)
        if bestie is None:
            return jsonify({"error":"No such bestie."}),404
        db.session.delete(bestie)
        db.session.commit()
        return jsonify({"msg":"Bestie Successfully Left"}),200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500
#   Update Bestie'
@app.route("/api/besties/<int:id>",methods=["PATCH"])
def update_bestie(id):
    try:
        bestie = Bestie.query.get(id)
        if bestie is None:
            return jsonify({"error":"No such bestie."}),404
        
        data=request.json
        bestie.name=data.get("name",bestie.name)
        bestie.role=data.get("role",bestie.role)
        bestie.description=data.get("description",bestie.description)
        bestie.gender=data.get("gender",bestie.gender)
        db.session.commit()    
        return jsonify({"msg":""})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500
    
    
    
    
    