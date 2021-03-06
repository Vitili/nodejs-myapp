/*
 * @Copyright ParanoiA
 * @Created: 9/13/20, 1:04 PM
 * @Date : 2020.
 * @author : M.ALi Kheiry
 *
 *    /\_/\
 *  =( °w° )=       Meow
 *    )   (  //
 *   (__ __)//
 */


const models = require('../models')

exports.get_landing = function (req, res, next) {
	res.render('landing', {title: 'Express', user: req.user});
}

exports.submit_lead = function (req, res, next) {
	return models.Lead.create({email: req.body.lead_email}).then(lead => {
		res.redirect('/leads');
	});
}

exports.show_leads = function (req, res, next) {
	models.Lead.findAll().then(leads => {
		res.render('lead/leads', {title: 'Express', leads: leads, user: req.user});
	})
}

exports.show_lead = function (req, res, next) {
	return models.Lead.findOne({
		where: {
			id: req.params.lead_id
		}
	}).then(lead => {
		res.render('lead/lead', {lead: lead, user: req.user});
	})
}

exports.show_edit_lead = function (req, res, next) {
	return models.Lead.findOne({
		where: {
			id: req.params.lead_id
		}
	}).then(lead => {
		res.render('lead/edit_lead', {lead: lead, user: req.user});
	})
}

exports.edit_lead = function (req, res, next) {
	return models.Lead.update({
		email: req.body.lead_email
	}, {
		where: {
			id: req.params.lead_id
		}
	}).then(result => {
		res.redirect('/lead/' + req.params.lead_id, {user: req.user});
	})
}

exports.delete_lead = function (req, res, next) {
	return models.Lead.destroy({
		where: {
			id: req.params.lead_id
		}
	}).then(result => {
		res.redirect('/leads', {user: req.user});
	})
}

exports.delete_lead_json = function (req, res, next) {
	return models.Lead.destroy({
		where: {
			id: req.params.lead_id
		}
	}).then(result => {
		res.send({msg: "Success"});
	})
}
