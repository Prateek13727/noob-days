import axios from 'axios';

export const INVOICE = "invoice";
export const INVOICES = "invoices";
export const INVOICE_CREATE = "invoice_create";

export function createInvoice(invoiceData, callback) {
	const data = JSON.stringify(invoiceData);
	const invoice = axios.post('/invoice', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
	return {
		type: INVOICE_CREATE,
		payload: invoice
	}
}

export function getInvoices(key="") {
	const invoices = axios.get(`/invoice?key=${key}`);
	return {
		type: INVOICES,
		payload: invoices
	}
}

export function getInvoiceById(id) {
	const invoice = axios.get(`/invoice/findById?id=${id}`);
	return {
		type: INVOICE,
		payload: invoice
	}
}


