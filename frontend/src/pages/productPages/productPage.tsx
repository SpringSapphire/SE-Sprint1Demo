import React, { useState, useEffect } from "react";
import {
    Space,
    Table,
    Button,
    Col,
    Row,
    Divider,
    Modal,
    message,
    Card,
} from "antd";
import dayjs from "dayjs"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { ProductInterface } from "../../interfaces/IProduct";
import { DeleteProductByID, GetProducts } from "../../services/https";

const ProductTable: React.FC = () => {
    const columns: ColumnsType<ProductInterface> = [
        {
            title: "ลำดับ",
            dataIndex: "ID",
            key: "id",
        },
        {
            title: "รูปสินค้า",
            dataIndex: "ProductPicture",
            key: "productpicture",
            width: "35vh",
            render: (text, record, index) => (
                <img
                    src={record.ProductPicture}
                    alt={record.ProductPicture}
                    className="w3-left w3-circle w3-margin-right"
                    width="50%"
                />
            ),
        },
        {
            title: "ชื่อสินค้า",
            dataIndex: "ProductName",
            key: "productname",
        },
        {
            title: "ราคา",
            dataIndex: "Price",
            key: "price",
        },
        {
            title: "ประเภทสินค้า",
            dataIndex: "Category",
            key: "category",
            render: (item) => Object.values(item.CategoryName),
        },
        {
            title: "วันที่เพิ่ม",
            dataIndex: "DateAdded",
            key: "dateAdded",
            render: (text: string) => dayjs(text).format("DD/MM/YYYY"),
        },
        {
            title: "คำอธิบายเพิ่มเติม",
            dataIndex: "ProductDescription",
            key: "productDescription",
            width: "40vh", 
        },
        {
            title: "จัดการ",
            dataIndex: "Manage",
            key: "manage",
            render: (text, record, index) => (
                <>
                    <Button
                        onClick={() => navigate(`/product/edit/${record.ID}`)}
                        shape="circle"
                        icon={<EditOutlined />}
                        size={"large"}
                    />
                    <Button
                        onClick={() => showModal(record)}
                        style={{ marginLeft: 10 }}
                        shape="circle"
                        icon={<DeleteOutlined />}
                        size={"large"}
                        danger
                    />
                </>
            ),
        },
    ];

    const navigate = useNavigate();

    const [products, setProducts] = useState<ProductInterface[]>([]);

    const [messageApi, contextHolder] = message.useMessage();

    // Model
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();
    const [deleteId, setDeleteId] = useState<Number>();

    const getProducts = async () => {
        let res = await GetProducts();
        if (res) {
            setProducts(res);
        }
    };

    const showModal = (val: ProductInterface) => {
        setModalText(
            `คุณต้องการลบข้อมูลสินค้า "${val.ProductName}" หรือไม่ ?`
        );
        setDeleteId(val.ID);
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        let res = await DeleteProductByID(deleteId);
        if (res) {
            setOpen(false);
            messageApi.open({
                type: "success",
                content: "ลบข้อมูลสำเร็จ",
            });
            getProducts();
        } else {
            setOpen(false);
            messageApi.open({
                type: "error",
                content: "เกิดข้อผิดพลาด !",
            });
        }
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div style={{ backgroundColor: "white" }}>
            {contextHolder}
            <Card style={{ margin: "5px", minHeight: "90vh" }}>
                <Row>
                    <Col span={12}>
                        <h2>จัดการข้อมูลสินค้า</h2>
                    </Col>
                </Row>
                <Divider />
                <div style={{ marginTop: 5 }}>
                    <Table rowKey="ID" columns={columns} dataSource={products} />
                </div>
                <Modal
                    title="ลบข้อมูล ?"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{modalText}</p>
                </Modal>
            </Card>
        </div>
    );
};

export default ProductTable;
