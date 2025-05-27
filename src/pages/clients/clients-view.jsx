import { useEffect } from "react";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import ClientsViewHeader from "./components/ClientsViewHeader";
import ClientsContent from "./components/ClientsContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientByUuid } from "../../store/slice/clientSlice";
import { useParams } from "react-router-dom";

const ClientsView = () => {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const { currentClient } = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(fetchClientByUuid(uuid));
  }, []);

  return (
    <>
      <PageHeader>
        <ClientsViewHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <ClientsContent userData={currentClient} />
        </div>
      </div>
    </>
  );
};

export default ClientsView;
