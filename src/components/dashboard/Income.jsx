import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../utils/Modal";
import Button from "../utils/Button";
import { addIncome, resetSuccess } from "../../services/slices/income/addIncomeSlice";

import { InlineLoader } from "../utils/Loader";


const Income = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.addIncome);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [incomeData, setIncomeData] = useState({
    userId: "",
    amount: "",
    description: "",
    date: "",
    category: ""
  });

  // Update userId when auth.user changes
  useEffect(() => {
    if (auth.user && auth.user._id) {
      setIncomeData((prevState) => ({ ...prevState, userId: auth.user._id }));
    }
  }, [auth.user]);

  useEffect(() => {
    if (success) {
      setModalIsOpen(false);
      setIncomeData({
        userId: auth.user ? auth.user._id : "",
        amount: "",
        description: "",
        date: "",
        category: ""
      });
      dispatch(resetSuccess()); 
    }
  }, [success, auth.user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIncome(incomeData));
  };

  return (
    <main>

      <div className="mt-2">
        {/* header */}
        <div className="w-full h-52 bg-[#0048DE] mb-2 "></div>

        <div className="flex justify-between items-start">
          <div className="border-2 flex flex-col justify-center items-center py-4 px-10">
            <h4>Total Balance</h4>
            <h2>$4000</h2>
          </div>
          <div
            onClick={() => setModalIsOpen(true)}
            className="border-2 flex flex-col bg-[008000] justify-center items-center px-5 py-3"
          >
            Add Income
          </div>

          <Modal
            isOpen={modalIsOpen}
            isClose={() => setModalIsOpen(false)}
            title="Add Income"
          >
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                required
                value={incomeData.amount}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, amount: e.target.value })
                }
                placeholder="Enter the amount"
                className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
              />

              <label className="mt-4" htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                required
                value={incomeData.date}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, date: e.target.value })
                }
                placeholder="Enter the date"
                className="border-2 placeholder:text-gray-400 rounded-[3px] p-2 mt-[3px] border-main outline-none"
              />
              <label className="mt-4" htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                required
                value={incomeData.category}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, category: e.target.value })
                }
                placeholder="Enter category"
                className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none "
              />
              <label className="mt-4" htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={incomeData.description}
                onChange={(e) =>
                  setIncomeData({ ...incomeData, description: e.target.value })
                }
                className="border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none mb-4"
                placeholder="Enter description"
              ></textarea>
              <Button text={loading ? <InlineLoader /> : "Add"} type="submit" specific="filled_button" />
            </form>
          </Modal>
        </div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, velit id placeat earum ipsum animi totam veritatis ex quas, incidunt, vero provident maiores consectetur repellendus debitis commodi doloribus praesentium. Aperiam quasi quia nihil dicta eos error totam accusantium illo reprehenderit, molestiae, assumenda nulla iusto eum temporibus omnis? Molestiae corrupti eius at quas necessitatibus? Alias tempora perspiciatis cupiditate! Eius quidem repudiandae, facere pariatur inventore voluptatibus fuga amet commodi at corporis, perspiciatis provident ipsa id iusto molestiae ducimus labore nulla, perferendis mollitia explicabo. Vitae velit, dignissimos maiores sint tempore cum blanditiis atque ipsum illo in consectetur aperiam fugiat quod minus beatae voluptate debitis, nobis error rem labore quia doloribus sapiente? Numquam consequatur architecto ullam harum praesentium impedit dolor illo, dignissimos hic doloremque mollitia iusto aspernatur ipsam sequi commodi dolore sed similique eaque! Assumenda quam impedit saepe laboriosam numquam possimus quidem ullam minima blanditiis asperiores optio ut voluptatibus suscipit at quae illum, iusto consectetur nihil rerum repudiandae amet. Explicabo officiis provident esse hic distinctio alias voluptas corrupti sed in obcaecati. Odio ratione provident hic at quo et repellat perferendis possimus, quae eum voluptatibus officiis unde quasi saepe harum maiores exercitationem officia impedit quam quod. Explicabo amet vero quae! Laborum id accusantium quam tempore dolorem, saepe iusto rerum nobis pariatur nihil esse, enim velit sunt blanditiis? Eum deleniti maiores assumenda? Exercitationem dolorem iste impedit, amet minima obcaecati distinctio eum, assumenda repellendus voluptatem quo eaque, tenetur inventore esse ex rem illo suscipit. Unde accusantium quis facilis eligendi provident necessitatibus earum, odio praesentium quod voluptate similique rerum cum illum. Suscipit saepe accusantium modi ad magni nesciunt delectus porro consequatur dolor, nam neque esse ut, cumque qui deserunt. Eum incidunt minus quae minima iusto hic voluptas pariatur? Sit voluptatum repellendus, quas dolore itaque ratione culpa voluptatem sequi. Doloribus earum nihil odit saepe facere quod excepturi enim laudantium molestias eligendi, quo atque ducimus reiciendis quaerat accusantium cum totam consequuntur quam maiores ipsum! Dicta assumenda error commodi quis consequuntur, autem suscipit expedita? Ad eius quae culpa aliquam consequuntur tenetur fugit ex voluptate exercitationem repellat? Quis voluptatem, earum asperiores, officiis distinctio suscipit laborum quidem accusantium nulla consequuntur laboriosam placeat labore excepturi. Laborum minima, modi impedit accusamus quasi, dolorum ullam nemo, non consequuntur perspiciatis excepturi necessitatibus architecto ducimus. Dolores, excepturi deleniti! Amet ratione molestias, sequi iste porro, unde nemo ipsam aspernatur temporibus molestiae corrupti assumenda. Temporibus pariatur id consequatur sint quae at, quam aspernatur iusto molestiae amet sunt laboriosam assumenda corporis nisi dolores optio cum nulla. Cupiditate incidunt, libero, doloribus magni eum impedit tenetur autem temporibus dolorem molestias quas ut eos deserunt animi reprehenderit fuga ab fugiat voluptatem expedita eaque excepturi sit illo? Quod libero natus, nemo delectus rerum officia iste consequuntur molestiae dolorum qui repellat sequi accusamus illo doloribus a id earum ratione tenetur aut maxime quis facere adipisci, quae veniam. Accusamus obcaecati ut id sed. Ab, vel laudantium quo nam eius sunt fuga tempora quos hic accusamus dolorem similique obcaecati facere maiores amet iste mollitia libero architecto nemo nihil dicta ut. Nihil ex assumenda repudiandae officiis, voluptates repellat vitae maiores incidunt cum, distinctio saepe aliquid itaque vero facere ducimus eligendi error, quas magni! Doloribus amet quidem repellat earum quod quia voluptate modi mollitia, aut labore optio nam quam id laboriosam odio veniam placeat officiis magni quae illum repudiandae quas? Temporibus voluptatem a ducimus sunt placeat soluta perferendis laudantium aspernatur ipsam veniam deserunt, laborum ullam corrupti illum libero repudiandae repellat delectus excepturi aut. Vero ipsum, magnam labore et dolores cum porro id aliquam! Est quia neque nulla atque, natus, repellendus in omnis iure, eius perferendis quas ut pariatur. Quos provident nam minus ratione aliquid repellat nihil, magni accusamus? Necessitatibus non sit minima? Voluptatibus unde illum libero quo sapiente recusandae dignissimos a similique! Dolor molestias illum libero optio dolore. Ut eveniet voluptatum placeat obcaecati et tempore quo fugit tempora officia! Obcaecati nemo aut consequatur, modi minus debitis fugiat quia asperiores animi facilis numquam, inventore, blanditiis esse vel maxime nostrum eveniet atque saepe labore cupiditate quos. Officiis placeat blanditiis deserunt ullam, earum, voluptatem quaerat doloribus quis expedita nobis commodi accusantium obcaecati autem nemo iste. Laboriosam magnam accusantium tempora, nobis totam quis placeat soluta! Perspiciatis numquam sunt suscipit quo, enim eveniet placeat deserunt cum! Qui voluptate consectetur doloribus nostrum rerum velit, cum dolore recusandae vel quidem cumque reprehenderit at quibusdam voluptatum beatae. Ea autem, quis sequi deserunt explicabo quos libero unde odio nobis ullam error minus doloremque doloribus harum iusto voluptatibus similique dolorem, illo nisi mollitia fugit ipsam quasi. Explicabo quia est sapiente beatae veniam velit, ipsam dolore ad voluptas nihil mollitia reiciendis eaque cum in officiis laudantium facilis doloribus eius provident modi sed esse, perferendis facere. Hic, aspernatur. Labore quia, ipsa optio eaque voluptates harum nesciunt autem voluptatibus praesentium quis vel, odit architecto, debitis repudiandae maxime quo dolorum. Nulla nemo nostrum consequuntur animi ducimus, saepe magni suscipit, optio aperiam officiis possimus dignissimos praesentium ad dicta quia, voluptates doloribus sunt sequi porro neque aliquid. Dolore non iste cumque eos mollitia error dignissimos culpa, molestiae maiores rerum sapiente accusantium, voluptate vel aliquid quisquam, officiis officia et at sint in sed porro. Velit atque fugit impedit quod accusantium repudiandae recusandae accusamus error culpa! Reiciendis sunt, eveniet libero officiis nihil debitis vitae tenetur a natus nam quia beatae nemo possimus laborum vel repudiandae doloremque similique, suscipit animi officia. Nostrum voluptate corrupti voluptatem tempora enim cupiditate error vel! Nemo quis temporibus culpa facilis soluta, laboriosam enim, obcaecati ut, accusamus placeat odio quidem. Commodi, tempora amet. Incidunt, explicabo possimus ea asperiores vel voluptates debitis placeat? Ut ullam alias maxime repellendus nisi, facilis similique! Quos officia incidunt a, aliquam illum esse tempora magni quam, similique quaerat tempore eos impedit non rerum officiis, doloribus vitae earum. Ipsam earum, neque suscipit perspiciatis dolore, ipsum eligendi harum deserunt, consequuntur ipsa laborum deleniti? Laudantium animi unde nostrum suscipit, iure non alias sit sint dignissimos minus quidem nisi repudiandae iste ut quas, at, dolorum eligendi necessitatibus maiores eius quae. Deleniti tempora quidem atque. Eligendi at labore dolorum sequi culpa neque a exercitationem, non sed velit suscipit porro error earum, quod quasi recusandae odio ab et corrupti. Repellendus, reiciendis magni ipsum ducimus aspernatur vero sit consequuntur, iste vel quae provident nulla incidunt at, libero dolorum laboriosam eligendi dolore dolor iure fugiat nemo voluptatem? Neque, quos aspernatur vel ducimus, quia maxime corporis praesentium autem accusantium eaque deserunt, esse id nemo iusto quaerat est dolorum consectetur! Consequatur cum eligendi eveniet ratione numquam a praesentium, at iure suscipit provident vero corporis itaque fugit veritatis assumenda, quidem quos voluptas illum. Non, magnam! Voluptates error incidunt quod nemo praesentium et dolorem saepe reiciendis hic, fugiat alias nam sint totam esse, voluptatibus labore veniam. Tenetur accusantium et eveniet commodi? Nesciunt delectus odio amet aliquid impedit accusantium id, officiis accusamus praesentium voluptatum sapiente temporibus nemo consequuntur minus laboriosam fugiat quidem est soluta quo vero, suscipit explicabo aut nihil tempora! Unde beatae odio id eaque, rerum vel eveniet porro explicabo odit molestias harum maxime, sequi optio! Quaerat rem optio, velit nemo aliquam atque et culpa non cupiditate ad laborum iure praesentium illo explicabo perferendis id eius doloremque eligendi minima delectus dolore dolores quos reiciendis. Doloribus cumque numquam modi expedita! Ipsum, earum quae aliquid maxime corrupti necessitatibus eligendi non nihil provident! Quam aut repellat recusandae quaerat assumenda ex quos quod neque fugiat vel, tenetur ab libero eveniet voluptate nulla asperiores alias cupiditate quibusdam, veritatis harum facere provident! Dolorum placeat enim doloribus possimus quia. Consequatur enim voluptates laboriosam dolor, quaerat blanditiis tempora voluptatum rerum porro soluta rem, pariatur vitae officiis sint nihil magnam quo cupiditate unde provident ipsa quis alias. Aspernatur voluptatem impedit quae, minus quod sit id laboriosam praesentium nihil doloremque ipsa magni dolores quidem aperiam. Libero, minima expedita repellat laudantium odio hic perspiciatis voluptatum itaque doloremque corporis, provident praesentium molestiae aperiam temporibus necessitatibus nesciunt alias eveniet eum facilis eligendi nihil enim! Temporibus omnis tempore, sunt iste blanditiis quibusdam deserunt sed tenetur similique reprehenderit ut est a vero cum ipsam recusandae aliquam delectus amet. Necessitatibus modi eum voluptatibus, accusantium iure consequuntur? Eos voluptas temporibus eum pariatur corporis. Sunt cumque ullam maxime sed vitae culpa incidunt at esse ipsum, labore atque dignissimos, non sapiente. Accusamus delectus repellendus aliquid ratione quisquam sed quibusdam tenetur asperiores, reiciendis sapiente distinctio quas nostrum cum iste omnis quaerat vitae, sit minus corrupti ipsam doloribus! Nemo laboriosam aut tenetur qui facere, minima id ut reprehenderit similique adipisci nam sapiente ullam iusto perspiciatis? Rem quam esse, obcaecati, delectus ex facilis sapiente quasi fuga doloremque magnam neque similique ad tempora possimus. Deserunt reiciendis neque explicabo atque quibusdam magni dolore esse eius id mollitia, consequatur itaque doloribus totam assumenda similique ad debitis sunt. Delectus, assumenda doloribus aut consectetur ipsum rerum ad exercitationem neque accusantium? Totam, vel deleniti! Explicabo expedita mollitia in, maxime pariatur provident nihil illum ad repudiandae dicta! Nemo ipsum magni dolores quas repudiandae, eius aut debitis consequuntur? Beatae nemo iste obcaecati tempora provident atque distinctio, recusandae dolores aut esse voluptas quos quia facere quo earum illum repellat sint. Repudiandae dolor optio unde iure aliquid cumque esse nesciunt nam, cum ducimus assumenda quis iusto et tenetur perferendis excepturi odit accusantium aspernatur deserunt molestias fugit impedit distinctio porro laborum. Nisi nulla dolores autem laudantium veritatis, voluptates eaque earum, dignissimos vel dolorum doloribus nostrum nesciunt sunt architecto iure amet reiciendis quae, quas neque dolore ex alias nam? Distinctio veniam iure non assumenda repellat corrupti maiores. Atque voluptatibus ullam quod dolor quia perferendis optio, consequatur esse minus aperiam modi perspiciatis sequi ducimus est maxime cum. Exercitationem inventore modi illo corrupti quia autem animi numquam quam, facilis qui reprehenderit soluta. Doloremque in et necessitatibus ab veritatis perspiciatis quasi reprehenderit natus odit tempore cumque, accusamus minus optio provident aperiam earum at sapiente accusantium, culpa placeat aliquid repudiandae quibusdam. Velit ex debitis earum ut ducimus veniam. At, sequi. Vero hic quasi, error a expedita, sunt sed illum culpa fugit inventore at dolor rerum ipsam accusantium nulla pariatur modi doloribus mollitia animi natus doloremque nemo enim distinctio numquam? Corporis, beatae molestiae eveniet odio voluptate doloribus nemo, vel tempore est fugiat optio aperiam, ipsa quas minus nulla facere aliquam voluptatibus natus. Maiores ad eligendi labore. Tempore dolorum culpa tenetur eius incidunt reprehenderit laudantium illo veniam officiis a, deserunt commodi labore excepturi repudiandae beatae natus eos deleniti non similique error. Quibusdam dolore quasi dicta quo minima velit exercitationem, reprehenderit temporibus voluptatum facere impedit voluptate consectetur enim consequuntur, nisi, consequatur eligendi assumenda porro praesentium debitis error? Minima distinctio amet cumque delectus unde, quaerat adipisci doloremque expedita accusantium vel quidem quo ratione accusamus harum! Dolorum blanditiis unde nobis assumenda cupiditate molestiae velit qui, voluptate vero, saepe perferendis consequuntur aperiam deserunt necessitatibus consequatur facilis ad impedit? Assumenda earum recusandae odio. Saepe, ipsa pariatur? Ut, eligendi enim vero aut dicta pariatur rem eum earum quia assumenda. Consectetur quisquam dolorum deserunt minus obcaecati aliquid delectus, placeat nulla quas, temporibus tempore aut iste ut tenetur hic exercitationem. Sed, itaque maxime. Officia in dolor animi quod eaque minima, sequi a id voluptate repudiandae voluptatibus aut quas quo voluptates, quam est explicabo? Incidunt laborum omnis, corporis cupiditate culpa iusto doloremque mollitia neque cumque quos natus, architecto, reprehenderit unde quas officia cum fugiat veritatis minus voluptatem. Accusantium provident tempore perspiciatis illum, a numquam possimus impedit atque ea. Ducimus odio beatae incidunt sint quaerat repellat similique repudiandae nobis hic totam aliquid voluptatum sapiente, mollitia perspiciatis vitae odit nihil exercitationem eveniet ea. In error laborum sequi expedita! Laborum placeat quae veritatis, odio, aperiam nihil magnam repellendus vitae velit ad rerum qui eius officiis repellat eum, illum reprehenderit hic minima impedit sed commodi corrupti. Quod recusandae, neque non quaerat at numquam quae quis voluptate quasi delectus adipisci ab molestias magni modi eaque. Perspiciatis tenetur accusamus vel amet nostrum rerum odit aliquid eius consequuntur minima hic, magni impedit molestiae tempora repellat voluptatum debitis blanditiis quidem sed? Omnis aspernatur ullam nulla suscipit quia magni rem amet, excepturi animi ea aperiam eaque error fugit vitae quasi? Repellat natus nulla quae iste qui architecto odio aliquam alias? Cumque mollitia est vel quibusdam sit, natus labore voluptatibus velit adipisci quam veniam magnam ipsum, quod voluptas enim obcaecati voluptatum necessitatibus eos deleniti amet alias rem? Pariatur quaerat perspiciatis illo dolorem, fugiat vel, adipisci id veritatis maxime, facilis voluptates laborum. Blanditiis temporibus a esse nobis, quod voluptas impedit repellendus laborum eum praesentium tempora ducimus vitae ipsum numquam qui asperiores illo cupiditate consectetur dolorem. Laborum nam, autem at est exercitationem aliquid architecto dolores voluptas sint magni sit consectetur fugiat placeat maxime ut ex? Cumque, harum. Consectetur quas dolor est earum aperiam recusandae fugit aut? Quisquam iste odit quasi doloribus natus nihil. Ab officiis aliquam officia corporis in sit numquam doloremque voluptatem praesentium, sunt adipisci ipsam asperiores vitae perferendis nobis iste. Temporibus omnis totam nam ducimus ipsa molestiae amet distinctio eaque quibusdam cumque corrupti consectetur natus neque perspiciatis assumenda doloremque facilis, inventore delectus consequuntur vel libero, repellendus, atque nihil excepturi? Illo quidem ducimus, consectetur cupiditate modi, est eaque sunt molestias asperiores earum vero? Animi blanditiis reiciendis voluptatem, recusandae reprehenderit impedit tenetur, rem, illo ducimus explicabo nemo fuga? Temporibus provident autem est quidem adipisci exercitationem fuga, harum alias iure eveniet aperiam, tempora sit maxime corrupti, non nostrum! Maxime illum repellat corporis ipsa delectus voluptate harum sequi minus. Facere quas dicta libero officiis vero est cum sapiente aut illo delectus, natus quidem ullam nihil repellendus placeat ab necessitatibus iure repellat quia perspiciatis? Hic nobis dolores corporis voluptas expedita autem accusamus repudiandae quod modi. Ducimus ab pariatur recusandae libero est debitis dolores id voluptate nisi minima mollitia architecto praesentium itaque iure ut cumque, earum beatae nulla. Veritatis facilis nobis maxime natus, totam in porro ipsa! Vero, nobis non, nisi provident cumque at assumenda eaque blanditiis a repellat officiis suscipit harum deserunt ut, aperiam distinctio odio sequi rem eveniet consequatur esse. Quos voluptas asperiores sequi id. Itaque nihil, quo sed quaerat eaque, perferendis reiciendis repellendus veniam ipsum quibusdam magni. Dolorum totam quaerat sed esse eos aspernatur fugit iste sint sapiente, consequatur magni, maxime assumenda dignissimos molestias! Explicabo excepturi maxime eligendi enim accusantium iste! Nemo ducimus, doloribus distinctio officia voluptatum nam non, saepe doloremque obcaecati nisi modi? Qui, nesciunt saepe a illo officiis tempore veniam ipsum accusamus perspiciatis iusto quasi quos? Aperiam sed rerum nisi non repellat, rem sunt sit voluptate quia pariatur officia maiores ad, sapiente libero quos repudiandae optio esse eius. Voluptate iusto tempore eos ipsum. Quis quisquam quo eveniet quidem fuga rem voluptate nam sapiente et distinctio ducimus maiores nesciunt aspernatur molestias tempore, sed rerum dolor fugit illum deserunt. Mollitia, quo officiis quaerat earum nesciunt nihil eum, consectetur harum animi ullam porro et laborum possimus sint necessitatibus quidem, rerum temporibus veniam cumque eligendi. Tempore, accusamus dignissimos, assumenda ea eum impedit ipsa nulla est sint incidunt vero aperiam illo magni nisi. Possimus est, odio corrupti quasi dolorum, vero in officia assumenda laudantium veniam eos itaque voluptate reprehenderit nulla omnis similique, accusamus quibusdam. Illo labore, ipsum voluptatum architecto quos corporis nobis eos sequi veritatis, quo iste laboriosam eum, veniam assumenda dolorum qui placeat mollitia aliquid velit quasi totam numquam. Mollitia corporis nulla facilis temporibus quis, reiciendis ex dolorum at voluptatibus eveniet aperiam, perferendis error vitae est totam praesentium reprehenderit. Quasi soluta veniam deserunt voluptatibus voluptatum officia. At dolores error autem veniam sint asperiores laboriosam suscipit nesciunt velit? Ad quos ex, illum officia hic officiis! Quaerat corrupti molestiae ex adipisci accusantium ad sint architecto quia, explicabo libero. Voluptates dolorum enim ipsam nisi, mollitia illo, placeat dolore illum officia optio numquam similique reiciendis odio cumque qui assumenda saepe molestias repellat quod fugit fuga? Atque, soluta ratione? Corporis assumenda vitae aliquid eos distinctio repellendus, reiciendis autem delectus ducimus magnam, nulla neque maiores error libero in! Iste sit nemo necessitatibus, quaerat quasi, cum magnam quos fugit perferendis ad, velit doloribus quis nam? Et alias reiciendis in magnam maxime perspiciatis quia? Nesciunt ipsa, earum expedita ipsum repellat at consectetur fuga. Tempora nemo quam nulla sunt ullam eum, adipisci harum modi quia eius accusantium consectetur sequi amet ipsam nostrum rerum. Veniam quisquam veritatis atque accusantium, quaerat minima officiis exercitationem suscipit eum quas minus adipisci blanditiis? Magnam debitis nemo soluta. Ex, modi facilis at animi, accusamus molestias, doloribus molestiae sunt nisi ratione praesentium labore eveniet voluptatum. Ullam, reprehenderit! Voluptas voluptatum sapiente ducimus quas cum aliquam, rerum excepturi debitis, recusandae numquam porro cumque nemo autem dolorem aperiam perspiciatis totam. Necessitatibus maxime dicta commodi repellendus fugiat, dolorum delectus officiis sequi velit molestias vitae, quo ipsa, fuga incidunt voluptas assumenda laborum aspernatur? Provident dolore earum veritatis nesciunt reiciendis aperiam velit itaque quas iste dolorem consequuntur at fuga quidem, dignissimos laboriosam. Alias ea rem odio enim totam facilis reiciendis dolores neque placeat repellendus provident aut quos odit ullam in repudiandae accusantium distinctio delectus similique culpa maxime, nobis labore asperiores est. Facere cum fugiat vitae quaerat saepe facilis. Eligendi aliquam quam modi ad perspiciatis tempora ea dolorem quia velit pariatur! Earum possimus natus rem adipisci, eaque eum doloribus necessitatibus maxime provident optio in repellendus iusto, officiis ipsum ea! Facilis non provident modi odio ut omnis ipsum? Illum provident similique autem aliquid error, quos voluptatem dignissimos aliquam eum, sit ratione exercitationem molestiae illo cum consequuntur repudiandae assumenda! Nihil maxime similique ea laudantium enim officiis in perspiciatis nemo quibusdam iste nulla, iusto earum modi debitis aliquam sint, officia doloribus unde quae mollitia, consequuntur cum. Dolores minus sit quos tempore maxime eum commodi quidem. Quidem, rem. Maiores vitae excepturi necessitatibus placeat officiis? Odio deleniti eum, assumenda dolorum minus suscipit itaque. Vitae quis officia laudantium earum inventore neque porro ad quae, ab dignissimos a excepturi, sit ullam asperiores vero ratione quasi! Possimus quam porro cum totam odio pariatur qui, consectetur nesciunt! Nobis eveniet neque inventore veritatis ea tenetur culpa autem laborum expedita tempora omnis iusto aspernatur, explicabo sit quidem minus, quos, ipsam a laudantium animi voluptas possimus quam numquam. Eveniet aliquid consequatur neque rem animi beatae enim atque quis veniam maxime consequuntur temporibus, nam, aperiam voluptatibus laborum fuga eos corrupti. Eaque ducimus accusamus molestias cupiditate, facere amet inventore delectus quam fugiat excepturi corrupti nihil quasi qui possimus vero fuga voluptates quis nostrum. Aperiam nemo nobis sit eos, vitae mollitia eaque! Neque consectetur, eaque commodi inventore facilis tempora quidem earum cumque, quod quo illum, expedita officiis ea quae! Harum soluta ut ex voluptatem cumque.
      </div>
    </main>
  );
};

export default Income;
