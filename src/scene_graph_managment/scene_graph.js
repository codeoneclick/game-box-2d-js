/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "scene_graph",
	extend: gb.ces_entity,

	init: function(transition) {
		this.m_camera = null;
		this.m_fabricator = null;
		this.m_transition = transition;

		var transformation_component = new gb.ces_transformation_component();
		this.add_component(transformation_component);
		var scene_component = new gb.ces_scene_component();
		scene_component.scene = this;
		this.add_component(scene_component);

		Object.defineProperty(this, 'camera', {
			set: function(value) {
				this.m_camera = value;
			},
			get: function() {
				return this.m_camera;
			}
		});

		Object.defineProperty(this, 'fabricator', {
			set: function(value) {
				this.m_fabricator = value;
			},
			get: function() {
				return this.m_fabricator;
			}
		});

		Object.defineProperty(this, 'transition', {
			get: function() {
				return this.m_transition;
			}
		});
	},

	release: function() {

	},

	methods: {
		set_box2d_world: function(min_bound, max_bound) {
			var box2d_world_component = this.get_component(gb.ces_base_component.type.box2d_world);
			if(!box2d_world_component) {
				box2d_world_component = new gb.ces_box2d_world_component();
				this.add_component(box2d_world_component);
			}
			box2d_world_component.set_bounds(min_bound, max_bound);
		},

		add_box2d_body: function(entity) {
			var box2d_world_component = this.get_component(gb.ces_base_component.type.box2d_world);
			var box2d_body_component = entity.get_component(gb.ces_base_component.type.box2d_body);
			if(box2d_world_component && !box2d_body_component) {
				box2d_body_component = new gb.ces_box2d_body_component();
				var transformation_component = entity.get_component(gb.ces_base_component.type.transformation);
				var box2d_definition = box2d_body_component.box2d_definition;
				box2d_definition.set_type(Box2D.b2_dynamicBody);
				box2d_definition.set_position(new Box2D.b2Vec2(transformation_component.position.x + entity.size.x * 0.5, transformation_component.position.y + entity.size.y * 0.5));
				box2d_definition.userData = entity;
				var box2d_shape = new Box2D.b2PolygonShape();
				var vertices = [];
				vertices.push(new Box2D.b2Vec2(0.0, 0.0));
				vertices.push(new Box2D.b2Vec2(entity.size.x, 0.0));
				vertices.push(new Box2D.b2Vec2(entity.size.x, entity.size.y));
				vertices.push(new Box2D.b2Vec2(0.0, entity.size.y));
				box2d_shape.SetAsBox(entity.size.x * 0.5, entity.size.y * 0.5);
				var box2d_body = box2d_world_component.box2d_world.CreateBody(box2d_body_component.box2d_definition);
				box2d_body.CreateFixture(box2d_shape, 1);
				box2d_body_component.box2d_body = box2d_body;
				entity.add_component(box2d_body_component);
			}
		},

		remove_box2d_body: function(entity) {
			var box2d_world_component = this.get_component(gb.ces_base_component.type.box2d_world);
			var box2d_body_component = entity.get_component(gb.ces_base_component.type.box2d_body);
			if(box2d_world_component && box2d_body_component) {
				box2d_world_component.box2d_world.DestroyBody(box2d_body_component.box2d_body);
				entity.remove_component(gb.ces_base_component.type.box2d_body);
			}
		}
	},

	static_methods: {

	}
});