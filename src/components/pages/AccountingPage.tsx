import React from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box as any);

interface ServiceItem {
    name: string;
    description: string;
    monthlyCost: number;
    category: string;
}

const services: ServiceItem[] = [
    {
        name: "Stripe",
        description: "Payment processing",
        monthlyCost: 0,
        category: "Finance",
    },
    {
        name: "Supabase",
        description: "Backend & Auth",
        monthlyCost: 0,
        category: "Infrastructure",
    },
    {
        name: "Github",
        description: "Source Code Management",
        monthlyCost: 0,
        category: "Infrastructure",
    },
    {
        name: "Netlify",
        description: "Frontend Hosting",
        monthlyCost: 0,
        category: "Hosting",
    },
    {
        name: "Render",
        description: "Backend Hosting",
        monthlyCost: 0,
        category: "Hosting",
    },
    {
        name: "ChatGPT Pro",
        description: "Ai Assistant",
        monthlyCost: 20,
        category: "AI",
    },
    {
        name: "Bluehost",
        description: "Wordpress Hosting + Domain Name",
        monthlyCost: 3.33,
        category: "Infrastructure",
    },
    {
        name: "Namecheap",
        description: "Domain Name",
        monthlyCost: 0.8,
        category: "Infrastructure",
    },
    {
        name: "Hostinger",
        description: "VPS",
        monthlyCost: 20,
        category: "Infrastructure",
    },
];

const AccountingPage: React.FC = () => {
    const total = services.reduce((sum, service) => sum + service.monthlyCost, 0);

    return (
        <Box sx={{ py: 6, px: 2, maxWidth: 900, mx: "auto", color: "inherit", }}>
            <MotionBox
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Accounting Overview
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Monthly subscriptions and services used in your business
                </Typography>
            </MotionBox>

            <TableContainer component={Paper} sx={{ mt: 4, bgcolor: "#ccc", borderRadius: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Service</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">Monthly Cost</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service, index) => (
                            <TableRow key={index}>
                                <TableCell>{service.name}</TableCell>
                                <TableCell>{service.description}</TableCell>
                                <TableCell>
                                    <Chip label={service.category} color="primary" variant="outlined" size="small" />
                                </TableCell>
                                <TableCell align="right">${service.monthlyCost.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={3} align="right">
                                <Typography fontWeight="bold">Total</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography fontWeight="bold">${total.toFixed(2)}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AccountingPage;
