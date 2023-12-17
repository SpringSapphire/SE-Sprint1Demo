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
import { SupplierInterface } from "../../interfaces/ISupplier";
import { DeleteSupplierByID, GetSuppliers } from "../../services/https";

const SupplierTable: React.FC = () => {
    const columns: ColumnsType<SupplierInterface> = [
        {
            title: "ลำดับ",
            dataIndex: "ID",
            key: "id",
        },
        {
            title: "รูปโรงงาน",
            dataIndex: "SupplierPicture",
            key: "supplierPicture",
            width: "35vh",
            render: (text, record, index) => (
                <img
                    src={record.SupplierPicture}
                    alt={record.SupplierPicture}
                    className="w3-left w3-circle w3-margin-right"
                    width="50%"
                />
            ),
        },
        {
            title: "ชื่อโรงงาน",
            dataIndex: "SupplierName",
            key: "supplierName",
        },
        {
            title: "เบอร์โทรศัพท์",
            dataIndex: "SupplierTel",
            key: "supplierTel",
        },
        {
            title: "คำอธิบายโรงงานเพิ่มเติม",
            dataIndex: "SupplierDescription",
            key: "supplierDescription",
            width: "50vh", 
        },
        {
            title: "จัดการ",
            dataIndex: "Manage",
            key: "manage",
            render: (text, record, index) => (
                <>
                    <Button
                        onClick={() => navigate(`/customer/edit/${record.ID}`)}
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

    const [suppliers, setSuppliers] = useState<SupplierInterface[]>([]);

    const [messageApi, contextHolder] = message.useMessage();

    // Model
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();
    const [deleteId, setDeleteId] = useState<Number>();

    const getSuppliers = async () => {
        let res = await GetSuppliers();
        if (res) {
            setSuppliers(res);
        }
    };

    const showModal = (val: SupplierInterface) => {
        setModalText(
            `คุณต้องการลบข้อมูล "${val.SupplierName}" หรือไม่ ?`
        );
        setDeleteId(val.ID);
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        let res = await DeleteSupplierByID(deleteId);
        if (res) {
            setOpen(false);
            messageApi.open({
                type: "success",
                content: "ลบข้อมูลสำเร็จ",
            });
            getSuppliers();
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
        getSuppliers();
    }, []);

    return (
        <div style={{ backgroundColor: "white" }}>
            {contextHolder}
            <Card style={{ margin: "5px", minHeight: "90vh" }}>
                <Row>
                    <Col span={12}>
                        <h2>จัดการข้อมูลโรงงานผลิต</h2>
                    </Col>
                </Row>
                <Divider />
                <div style={{ marginTop: 5 }}>
                    <Table rowKey="ID" columns={columns} dataSource={suppliers} />
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

export default SupplierTable;
