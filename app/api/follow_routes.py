from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User


follow_routes = Blueprint('follows', __name__)
