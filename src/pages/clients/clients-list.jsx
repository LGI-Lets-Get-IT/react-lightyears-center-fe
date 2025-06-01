import ClientsTable from "./components/ClientsTable";
import ClientsHeader from "./components/ClientsHeader";
import PageHeader from "@/components/shared/pageHeader/PageHeader";

const ClientsList = () => {
  return (
    <>
      <PageHeader>
        <ClientsHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <ClientsTable />
        </div>
      </div>
    </>
  );
};

export default ClientsList;
